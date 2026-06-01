"""
Shared Twilio WhatsApp messaging utilities.

Provides:
  - ``send_whatsapp_to_clinic()`` – sends the appointment notification to the
    clinic's WhatsApp number (mirrors the original server.py behaviour).
  - ``send_whatsapp_to_number()`` – sends an arbitrary message to any
    WhatsApp-enabled phone number (used by campaigns).
  - ``build_appointment_message()`` – formats an appointment payload into a
    human-readable WhatsApp message body.
"""

from __future__ import annotations

import os
from datetime import datetime
from typing import Optional, Tuple

from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client as TwilioClient


def _get_twilio_client() -> Optional[TwilioClient]:
    """Return a Twilio client if credentials are configured, else ``None``."""
    sid = os.environ.get("TWILIO_ACCOUNT_SID")
    token = os.environ.get("TWILIO_AUTH_TOKEN")
    if sid and token:
        return TwilioClient(sid, token)
    return None


def _whatsapp_from() -> str:
    return os.environ.get("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")


def _clinic_whatsapp_to() -> str:
    return os.environ.get("CLINIC_WHATSAPP_TO", "whatsapp:+917303034849")


# ── Public helpers ─────────────────────────────────────────────────────


def build_appointment_message(data: dict) -> str:
    """Format appointment data into the clinic notification message.

    Accepts either a Pydantic model ``.dict()`` or a raw dict with the
    standard appointment fields.
    """
    try:
        date_display = datetime.fromisoformat(data["appointmentDate"]).strftime(
            "%d %b %Y"
        )
    except Exception:
        date_display = data["appointmentDate"]

    notes = data.get("additionalNotes") or ""
    note_line = f"\nNote: {notes}" if notes else ""

    return (
        f"New Appointment Booking - Swastik Imaging & Diagnostics\n\n"
        f"Patient Name: {data['fullName']}\n"
        f"Phone: +91 {data['phoneNumber']}\n"
        f"Email: {data['email']}\n"
        f"Gender: {data['gender']}\n"
        f"Age: {data['age']}\n"
        f"Selected Test: {data['testSelection']}\n"
        f"Preferred Slot: {date_display} at {data['appointmentTime']}"
        f"{note_line}"
    )


def send_whatsapp_to_clinic(message: str) -> Tuple[bool, Optional[str]]:
    """Send a WhatsApp message to the clinic number.

    Returns ``(success: bool, error: Optional[str])``.
    """
    return send_whatsapp_to_number(message, _clinic_whatsapp_to())


def send_whatsapp_to_number(
    message: str, to: str
) -> Tuple[bool, Optional[str]]:
    """Send a WhatsApp message to an arbitrary recipient.

    ``to`` must be in Twilio's ``whatsapp:+<E.164>`` format.

    Returns ``(success: bool, error: Optional[str])``.
    """
    client = _get_twilio_client()
    if client is None:
        return False, "Twilio credentials not configured"
    try:
        client.messages.create(
            from_=_whatsapp_from(),
            to=to,
            body=message,
        )
        return True, None
    except TwilioRestException as exc:
        return False, f"Twilio error: {exc.msg}"
    except Exception as exc:  # noqa: BLE001
        return False, str(exc)
