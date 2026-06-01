"""
MongoDB connection manager using Motor (async driver).

Provides lazy-initialised access to the four collections used by the app:
  - appointments
  - contacts
  - campaigns
  - admin_users

Usage:
    from app.database import get_db, connect_db, close_db

    # At startup
    await connect_db()

    # In route handlers
    db = get_db()
    doc = await db.appointments.find_one(...)

    # At shutdown
    await close_db()
"""

from __future__ import annotations

import os
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase


class _Database:
    """Singleton wrapper around the Motor client and database handle."""

    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None

    # ── Collection shortcuts ───────────────────────────────────────────
    @property
    def appointments(self):
        return self.db["appointments"]

    @property
    def contacts(self):
        return self.db["contacts"]

    @property
    def campaigns(self):
        return self.db["campaigns"]

    @property
    def admin_users(self):
        return self.db["admin_users"]


_instance = _Database()


async def connect_db() -> None:
    """Open the Motor client and resolve the target database.

    Reads ``MONGO_URL`` and ``DB_NAME`` from environment variables (they
    must already be loaded, e.g. via ``python-dotenv``).
    """
    mongo_url = os.environ["MONGO_URL"]
    db_name = os.environ["DB_NAME"]

    _instance.client = AsyncIOMotorClient(mongo_url)
    _instance.db = _instance.client[db_name]

    # Create indexes for performance & uniqueness
    await _instance.contacts.create_index("phone", unique=True)
    await _instance.admin_users.create_index("username", unique=True)
    await _instance.appointments.create_index("createdAt")
    await _instance.contacts.create_index("createdAt")
    await _instance.campaigns.create_index("createdAt")


async def close_db() -> None:
    """Gracefully close the Motor client."""
    if _instance.client is not None:
        _instance.client.close()
        _instance.client = None
        _instance.db = None


def get_db() -> _Database:
    """Return the database singleton.  Must call ``connect_db()`` first."""
    if _instance.db is None:
        raise RuntimeError("Database not initialised – call connect_db() first")
    return _instance
