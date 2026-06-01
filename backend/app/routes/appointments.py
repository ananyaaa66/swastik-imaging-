"""
Appointment routes.

POST /api/appointment      – public: create appointment, upsert contact, notify clinic
GET  /api/appointments     – admin: list / search appointments
GET  /api/appointments/stats – admin: dashboard statistics
GET  /api/appointments/{id}  – admin: single appointment
DELETE /api/appointments/{id} – admin: delete appointment
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, EmailStr, Field

from app.auth import get_current_admin
from app.database import get_db
from app.whatsapp import build_appointment_message, send_whatsapp_to_clinic

router = APIRouter(tags=["appointments"])


# ── Pydantic models ──────────────────────────────────────────────────────


class AppointmentRequest(BaseModel):
    """Matches the existing frontend form schema exactly."""
    fullName: str = Field(..., min_length=2)
    phoneNumber: str = Field(..., pattern=r"^[0-9]{10}$")
    email: EmailStr
    gender: str
    age: int = Field(..., ge=1, le=150)
    appointmentDate: str
    appointmentTime: str
    testSelection: str
    additionalNotes: Optional[str] = ""


class AppointmentResponse(BaseModel):
    id: str
    success: bool
    message: str
    whatsappSent: bool


# ── Helper ────────────────────────────────────────────────────────────────


def _serialize(doc: dict) -> dict:
    """Convert MongoDB document to JSON-safe dict."""
    doc["id"] = str(doc.pop("_id"))
    return doc


# ── Routes ────────────────────────────────────────────────────────────────


@router.post("/api/appointment", response_model=AppointmentResponse)
async def create_appointment(payload: AppointmentRequest):
    """Create an appointment (public endpoint).

    1. Save appointment to MongoDB.
    2. Auto-upsert a contact record by phone number.
    3. Send WhatsApp notification to the clinic.
    """
    db = get_db()
    appointment_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    # Build and send WhatsApp message
    message_text = build_appointment_message(payload.model_dump())
    whatsapp_ok, whatsapp_error = send_whatsapp_to_clinic(message_text)

    # Store appointment
    doc = {
        "id": appointment_id,
        "fullName": payload.fullName,
        "phoneNumber": payload.phoneNumber,
        "email": payload.email,
        "gender": payload.gender,
        "age": payload.age,
        "appointmentDate": payload.appointmentDate,
        "appointmentTime": payload.appointmentTime,
        "testSelection": payload.testSelection,
        "additionalNotes": payload.additionalNotes or "",
        "whatsappSent": whatsapp_ok,
        "whatsappError": whatsapp_error,
        "createdAt": now,
    }
    await db.appointments.insert_one(doc)

    # Auto-upsert contact (phone is unique key)
    await db.contacts.update_one(
        {"phone": payload.phoneNumber},
        {
            "$set": {
                "patientName": payload.fullName,
                "email": payload.email,
            },
            "$setOnInsert": {
                "phone": payload.phoneNumber,
                "source": "website",
                "createdAt": now,
            },
        },
        upsert=True,
    )

    if not whatsapp_ok:
        return AppointmentResponse(
            id=appointment_id,
            success=True,
            message="Appointment saved. WhatsApp notification could not be sent; clinic will reach out shortly.",
            whatsappSent=False,
        )

    return AppointmentResponse(
        id=appointment_id,
        success=True,
        message="Appointment booked successfully. The clinic has been notified via WhatsApp.",
        whatsappSent=True,
    )


@router.get("/api/appointments/stats")
async def appointment_stats(_admin: dict = Depends(get_current_admin)):
    """Return aggregate statistics for the dashboard."""
    db = get_db()
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    week_start = (now - timedelta(days=now.weekday())).replace(
        hour=0, minute=0, second=0, microsecond=0
    ).isoformat()
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0).isoformat()

    total = await db.appointments.count_documents({})
    today = await db.appointments.count_documents({"createdAt": {"$gte": today_start}})
    this_week = await db.appointments.count_documents({"createdAt": {"$gte": week_start}})
    this_month = await db.appointments.count_documents({"createdAt": {"$gte": month_start}})

    return {"total": total, "today": today, "thisWeek": this_week, "thisMonth": this_month}


@router.get("/api/appointments")
async def list_appointments(
    search: Optional[str] = Query(None),
    limit: int = Query(100, ge=1, le=500),
    _admin: dict = Depends(get_current_admin),
):
    """List appointments with optional text search."""
    db = get_db()
    query: dict = {}

    if search:
        search_regex = {"$regex": search, "$options": "i"}
        query["$or"] = [
            {"fullName": search_regex},
            {"phoneNumber": search_regex},
            {"email": search_regex},
            {"testSelection": search_regex},
        ]

    cursor = db.appointments.find(query).sort("createdAt", -1).limit(limit)
    results = []
    async for doc in cursor:
        results.append(_serialize(doc))
    return results


@router.get("/api/appointments/{appointment_id}")
async def get_appointment(
    appointment_id: str,
    _admin: dict = Depends(get_current_admin),
):
    """Get a single appointment by its UUID or ObjectId."""
    db = get_db()
    # Try by UUID field first
    doc = await db.appointments.find_one({"id": appointment_id})
    if doc is None:
        # Try by MongoDB ObjectId
        try:
            doc = await db.appointments.find_one({"_id": ObjectId(appointment_id)})
        except Exception:
            pass
    if doc is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return _serialize(doc)


@router.delete("/api/appointments/{appointment_id}", status_code=204)
async def delete_appointment(
    appointment_id: str,
    _admin: dict = Depends(get_current_admin),
):
    """Delete an appointment."""
    db = get_db()
    result = await db.appointments.delete_one({"id": appointment_id})
    if result.deleted_count == 0:
        try:
            result = await db.appointments.delete_one({"_id": ObjectId(appointment_id)})
        except Exception:
            pass
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
