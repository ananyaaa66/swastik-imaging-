"""
Swastik Medscan – FastAPI application entry point.

Mounts all routers, configures CORS, and manages the MongoDB lifecycle.

Run with:
    uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
"""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import close_db, connect_db
from app.auth import router as admin_router
from app.routes.appointments import router as appointment_router
from app.routes.contacts import router as contact_router
from app.routes.campaigns import router as campaign_router

load_dotenv()

logger = logging.getLogger("app.main")


# ── Lifecycle ─────────────────────────────────────────────────────────────


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Modern lifespan handler — replaces deprecated on_event."""
    # Startup
    try:
        await connect_db()
        logger.info("Application startup complete.")
    except Exception as exc:
        logger.error("Startup error (non-fatal): %s", exc)
    yield
    # Shutdown
    await close_db()
    logger.info("Application shutdown complete.")


# ── App ───────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Swastik Imaging & Diagnostics – API",
    description="Appointment booking, contact management, and campaign APIs.",
    version="2.0.0",
    lifespan=lifespan,
)


# ── Temporary: detailed error responses for debugging ─────────────────
import traceback
from fastapi.responses import JSONResponse
from starlette.requests import Request


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Return detailed error info instead of generic 500."""
    logger.error("Unhandled exception: %s", traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={
            "detail": str(exc),
            "type": type(exc).__name__,
            "traceback": traceback.format_exc().split("\n")[-4:],
        },
    )

# ── CORS ──────────────────────────────────────────────────────────────────

_default_origins = [
    "https://swastikmedscan.com",
    "https://www.swastikmedscan.com",
    "http://localhost:3000",       # Vite dev server
    "http://localhost:5173",       # Vite default port
]

_env_origins = os.environ.get("ALLOWED_ORIGINS", "")
_env_list = [o.strip() for o in _env_origins.split(",") if o.strip()] if _env_origins else []
# Merge defaults and env-specified origins, preserving order/uniqueness
ALLOWED_ORIGINS = []
for origin in (_default_origins + _env_list):
    if origin not in ALLOWED_ORIGINS:
        ALLOWED_ORIGINS.append(origin)


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",  # All Vercel preview deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────

app.include_router(admin_router)
app.include_router(appointment_router)
app.include_router(contact_router)
app.include_router(campaign_router)


# ── Health check ──────────────────────────────────────────────────────────


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/debug")
async def debug_info():
    """Temporary debug endpoint — remove after deployment is verified."""
    import sys
    import ssl

    from app.database import _instance

    return {
        "python_version": sys.version,
        "openssl_version": ssl.OPENSSL_VERSION,
        "db_connected": _instance.db is not None,
        "mongo_url_set": bool(os.environ.get("MONGO_URL")),
        "db_name": os.environ.get("DB_NAME", "NOT SET"),
        "allowed_origins": ALLOWED_ORIGINS,
    }
