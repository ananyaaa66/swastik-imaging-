"""
Swastik Medscan – FastAPI application entry point.

Mounts all routers, configures CORS, and manages the MongoDB lifecycle.

Run with:
    uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
"""

from __future__ import annotations

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import close_db, connect_db
from app.auth import router as admin_router
from app.routes.appointments import router as appointment_router
from app.routes.contacts import router as contact_router
from app.routes.campaigns import router as campaign_router

load_dotenv()

# ── App ───────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Swastik Imaging & Diagnostics – API",
    description="Appointment booking, contact management, and campaign APIs.",
    version="2.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────────────

_default_origins = [
    "https://swastikmedscan.com",
    "https://www.swastikmedscan.com",
    "http://localhost:3000",       # Vite dev server
    "http://localhost:5173",       # Vite default port
]

_env_origins = os.environ.get("ALLOWED_ORIGINS", "")
ALLOWED_ORIGINS = (
    [o.strip() for o in _env_origins.split(",") if o.strip()]
    if _env_origins
    else _default_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",  # All Vercel preview deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Lifecycle ─────────────────────────────────────────────────────────────


@app.on_event("startup")
async def startup():
    await connect_db()


@app.on_event("shutdown")
async def shutdown():
    await close_db()


# ── Routers ───────────────────────────────────────────────────────────────

app.include_router(admin_router)
app.include_router(appointment_router)
app.include_router(contact_router)
app.include_router(campaign_router)


# ── Health check ──────────────────────────────────────────────────────────


@app.get("/api/health")
async def health():
    return {"status": "ok"}
