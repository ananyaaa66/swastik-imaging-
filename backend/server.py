import os
import uuid
from datetime import datetime, timezone
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from twilio.rest import Client as TwilioClient
from twilio.base.exceptions import TwilioRestException

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN")
TWILIO_WHATSAPP_FROM = os.environ.get("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")
CLINIC_WHATSAPP_TO = os.environ.get("CLINIC_WHATSAPP_TO", "whatsapp:+917303034849")

mongo_client = AsyncIOMotorClient(MONGO_URL)
db = mongo_client[DB_NAME]
appointments_collection = db["appointments"]

app = FastAPI(title="Swastik Imaging - Appointment API")

# CORS — restrict to known production + preview origins.
# Override via env var ALLOWED_ORIGINS (comma-separated) if you add more domains later.
_default_origins = [
    "https://swastikmedscan.com",
    "https://www.swastikmedscan.com",
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
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class AppointmentRequest(BaseModel):
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


def build_message(data: AppointmentRequest) -> str:
    try:
        date_display = datetime.fromisoformat(data.appointmentDate).strftime("%d %b %Y")
    except Exception:
        date_display = data.appointmentDate

    note_line = f"\nNote: {data.additionalNotes}" if data.additionalNotes else ""

    return (
        f"New Appointment Booking - Swastik Imaging & Diagnostics\n\n"
        f"Patient Name: {data.fullName}\n"
        f"Phone: +91 {data.phoneNumber}\n"
        f"Email: {data.email}\n"
        f"Gender: {data.gender}\n"
        f"Age: {data.age}\n"
        f"Selected Test: {data.testSelection}\n"
        f"Preferred Slot: {date_display} at {data.appointmentTime}"
        f"{note_line}"
    )


def send_whatsapp(message: str) -> tuple[bool, Optional[str]]:
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN):
        return False, "Twilio credentials not configured"
    try:
        client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(
            from_=TWILIO_WHATSAPP_FROM,
            to=CLINIC_WHATSAPP_TO,
            body=message,
        )
        return True, None
    except TwilioRestException as e:
        return False, f"Twilio error: {e.msg}"
    except Exception as e:
        return False, str(e)


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/appointment", response_model=AppointmentResponse)
async def create_appointment(payload: AppointmentRequest):
    appointment_id = str(uuid.uuid4())
    message_text = build_message(payload)

    whatsapp_ok, whatsapp_error = send_whatsapp(message_text)

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
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    await appointments_collection.insert_one(doc)

    if not whatsapp_ok:
        # Still return 200 - appointment stored. Client can act on whatsappSent flag.
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


@app.get("/api/appointments")
async def list_appointments(limit: int = 50):
    cursor = appointments_collection.find({}, {"_id": 0}).sort("createdAt", -1).limit(limit)
    return await cursor.to_list(length=limit)
