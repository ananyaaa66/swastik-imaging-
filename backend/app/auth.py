"""
Admin authentication module — JWT-based.

Provides:
  - Password hashing / verification (passlib + bcrypt).
  - ``create_access_token()`` — issues a signed JWT.
  - ``get_current_admin()`` — FastAPI dependency that validates the
    ``Authorization: Bearer <token>`` header and returns the admin doc.
  - Router with ``/api/admin/register``, ``/api/admin/login``, and
    ``/api/admin/verify`` endpoints.
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field

from app.database import get_db

# ── Configuration ──────────────────────────────────────────────────────

_JWT_ALGORITHM = "HS256"
_JWT_EXPIRE_HOURS = 24

_pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
_bearer_scheme = HTTPBearer()

router = APIRouter(prefix="/api/admin", tags=["admin"])


def _jwt_secret() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET environment variable is not set")
    return secret


# ── Password helpers ───────────────────────────────────────────────────


def hash_password(plain: str) -> str:
    """Return a bcrypt hash of *plain*."""
    return _pwd_ctx.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    """Check *plain* against *hashed*."""
    return _pwd_ctx.verify(plain, hashed)


# ── JWT helpers ────────────────────────────────────────────────────────


def create_access_token(
    data: dict,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Create a signed JWT with the given payload.

    Defaults to 24-hour expiry.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(hours=_JWT_EXPIRE_HOURS)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, _jwt_secret(), algorithm=_JWT_ALGORITHM)


# ── FastAPI dependency ─────────────────────────────────────────────────


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> dict:
    """Validate the Bearer token and return the admin user document.

    Raises ``401`` if the token is missing / invalid / expired, or the
    referenced admin user no longer exists.
    """
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[_JWT_ALGORITHM])
        username: Optional[str] = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    db = get_db()
    admin = await db.admin_users.find_one({"username": username})
    if admin is None:
        raise credentials_exception

    # Return a safe representation (no password hash)
    return {
        "id": str(admin["_id"]),
        "username": admin["username"],
        "role": admin.get("role", "admin"),
    }


# ── Pydantic models ───────────────────────────────────────────────────


class AdminRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    role: str


# ── Routes ─────────────────────────────────────────────────────────────


@router.post("/register", response_model=TokenResponse)
async def register_admin(body: AdminRegisterRequest):
    """Register the *first* admin user.

    This endpoint intentionally refuses to create additional admins — it
    only works when the ``admin_users`` collection is empty.
    """
    db = get_db()

    existing_count = await db.admin_users.count_documents({})
    if existing_count > 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin already exists. Registration is disabled.",
        )

    doc = {
        "username": body.username,
        "passwordHash": hash_password(body.password),
        "role": "admin",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    result = await db.admin_users.insert_one(doc)

    token = create_access_token({"sub": body.username, "role": "admin"})
    return TokenResponse(
        access_token=token,
        username=body.username,
        role="admin",
    )


@router.post("/login", response_model=TokenResponse)
async def login_admin(body: AdminLoginRequest):
    """Authenticate with username + password and receive a JWT."""
    db = get_db()
    admin = await db.admin_users.find_one({"username": body.username})

    if admin is None or not verify_password(body.password, admin["passwordHash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_access_token(
        {"sub": admin["username"], "role": admin.get("role", "admin")}
    )
    return TokenResponse(
        access_token=token,
        username=admin["username"],
        role=admin.get("role", "admin"),
    )


@router.get("/verify")
async def verify_token(admin: dict = Depends(get_current_admin)):
    """Validate the current token — returns the admin profile on success."""
    return {"valid": True, "admin": admin}
