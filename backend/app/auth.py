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
import bcrypt
from pydantic import BaseModel, Field

from app.database import get_db

# ── Configuration ──────────────────────────────────────────────────────

_JWT_ALGORITHM = "HS256"
_JWT_EXPIRE_HOURS = 24

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
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    """Check *plain* against *hashed*."""
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


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


# ── Temporary: Reset admin users for troubleshooting ─────────────────
@router.get("/danger-reset-admins")
async def danger_reset_admins():
    db = get_db()
    admins = await db.admin_users.find({}).to_list(length=100)
    admin_list = [{"id": str(a["_id"]), "username": a.get("username")} for a in admins]
    
    delete_result = await db.admin_users.delete_many({})
    return {
        "status": "cleared",
        "deleted_count": delete_result.deleted_count,
        "previous_admins": admin_list
    }


# ── Temporary: Debug WhatsApp issues ──────────────────────────────────
@router.get("/debug-whatsapp")
async def debug_whatsapp():
    db = get_db()
    
    # Get last 5 appointments
    appointments = await db.appointments.find({}).sort("createdAt", -1).limit(5).to_list(length=5)
    app_list = [{
        "id": a.get("id"),
        "fullName": a.get("fullName"),
        "phoneNumber": a.get("phoneNumber"),
        "whatsappSent": a.get("whatsappSent"),
        "whatsappError": a.get("whatsappError"),
        "createdAt": a.get("createdAt")
    } for a in appointments]
    
    # Get last 5 campaigns
    campaigns = await db.campaigns.find({}).sort("createdAt", -1).limit(5).to_list(length=5)
    camp_list = [{
        "id": str(c.get("_id") or c.get("id")),
        "title": c.get("title"),
        "successCount": c.get("successCount"),
        "failureCount": c.get("failureCount"),
        "createdAt": c.get("createdAt")
    } for c in campaigns]

    return {
        "appointments": app_list,
        "campaigns": camp_list,
        "twilio_configured": bool(os.environ.get("TWILIO_ACCOUNT_SID") and os.environ.get("TWILIO_AUTH_TOKEN")),
        "twilio_sid": os.environ.get("TWILIO_ACCOUNT_SID", "")[:10] + "..." if os.environ.get("TWILIO_ACCOUNT_SID") else None,
    }


# ── Temporary: Debug search contact ───────────────────────────────────
@router.get("/debug-search-contact")
async def debug_search_contact(q: str):
    db = get_db()
    cursor = db.contacts.find({
        "$or": [
            {"patientName": {"$regex": q, "$options": "i"}},
            {"phone": {"$regex": q, "$options": "i"}},
            {"email": {"$regex": q, "$options": "i"}}
        ]
    })
    results = []
    async for doc in cursor:
        results.append({
            "id": str(doc.get("_id") or doc.get("id")),
            "patientName": doc.get("patientName") or doc.get("name"),
            "phone": doc.get("phone"),
            "email": doc.get("email"),
            "source": doc.get("source"),
            "createdAt": doc.get("createdAt")
        })
    return results



