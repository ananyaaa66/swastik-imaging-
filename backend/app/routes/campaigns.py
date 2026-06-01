"""
Campaign management routes.

GET  /api/campaigns         – list campaigns (admin)
POST /api/campaigns         – create + send campaign (admin)
GET  /api/campaigns/{id}    – single campaign detail (admin)
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
from typing import List, Optional

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field

from app.auth import get_current_admin
from app.database import get_db
from app.whatsapp import send_whatsapp_to_number

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])


# ── Pydantic models ──────────────────────────────────────────────────────


class CreateCampaignRequest(BaseModel):
    title: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    recipientIds: Optional[List[str]] = None


# ── Helper ────────────────────────────────────────────────────────────────


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


async def _send_to_one(message: str, phone: str) -> dict:
    """Send WhatsApp message to a single phone number.

    Returns a result dict for tracking success/failure.
    """
    to = f"whatsapp:+91{phone}"
    ok, error = send_whatsapp_to_number(message, to)
    return {"phone": phone, "success": ok, "error": error}


# ── Routes ────────────────────────────────────────────────────────────────


@router.get("")
async def list_campaigns(
    limit: int = Query(50, ge=1, le=200),
    _admin: dict = Depends(get_current_admin),
):
    db = get_db()
    cursor = db.campaigns.find().sort("createdAt", -1).limit(limit)
    results = []
    async for doc in cursor:
        results.append(_serialize(doc))
    return results


@router.post("", status_code=201)
async def create_campaign(
    body: CreateCampaignRequest,
    _admin: dict = Depends(get_current_admin),
):
    """Create a campaign and send WhatsApp messages.

    If ``recipientIds`` is provided, send only to those contacts.
    Otherwise send to ALL contacts.
    """
    db = get_db()

    # Resolve recipients
    if body.recipientIds and len(body.recipientIds) > 0:
        object_ids = []
        for rid in body.recipientIds:
            try:
                object_ids.append(ObjectId(rid))
            except Exception:
                pass
        contacts_cursor = db.contacts.find({"_id": {"$in": object_ids}})
    else:
        contacts_cursor = db.contacts.find({})

    recipients = []
    async for contact in contacts_cursor:
        phone = contact.get("phone", "")
        if phone:
            recipients.append(phone)

    total_recipients = len(recipients)

    if total_recipients == 0:
        raise HTTPException(status_code=400, detail="No valid recipients found")

    # Send messages in parallel
    tasks = [_send_to_one(body.message, phone) for phone in recipients]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    success_count = 0
    failure_count = 0
    for r in results:
        if isinstance(r, dict) and r.get("success"):
            success_count += 1
        else:
            failure_count += 1

    # Store campaign record
    doc = {
        "title": body.title,
        "message": body.message,
        "totalRecipients": total_recipients,
        "successCount": success_count,
        "failureCount": failure_count,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    result = await db.campaigns.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)

    return doc


@router.get("/{campaign_id}")
async def get_campaign(
    campaign_id: str,
    _admin: dict = Depends(get_current_admin),
):
    db = get_db()
    try:
        doc = await db.campaigns.find_one({"_id": ObjectId(campaign_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid campaign ID")
    if doc is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return _serialize(doc)
