# Swastik Imaging & Diagnostics — PRD

## Original Problem Statement
Existing clinic website. Do NOT change UI/branding. Required:
1. Update appointment form Test Type dropdown using PDF rate list (no prices).
2. Navbar + Footer "Book Appointment" links must navigate to the appointment form.
3. Backend API to receive appointment submissions and send WhatsApp to clinic (+91-7303034849) via Twilio.
4. Store sensitive credentials in env vars; proper error handling.
5. On submit: success message + form reset.

## Architecture
- **Frontend**: `/app/frontend` — Vite + React + TypeScript, served by `yarn start` on port 3000.
- **Backend**: `/app/backend` — FastAPI on port 8001 (uvicorn).
- **DB**: MongoDB (local, db=`swastik_diagnostics`, collection=`appointments`).
- **External Integrations**: Twilio WhatsApp (sandbox sender `+14155238886`, destination `+917303034849`).
- **Routing**: Public URL → ingress → `/api/*` to FastAPI, everything else to Vite.

## Implemented Features (2026-05-17)
- `POST /api/appointment` — validates payload, persists to MongoDB, sends Twilio WhatsApp message with all patient details (name, phone, email, gender, age, selected test, preferred slot, notes); returns `{id, success, message, whatsappSent}`.
- `GET /api/health` and `GET /api/appointments` (record view).
- `BookAppointment.tsx` — Test Type dropdown populated with full PDF list (X-RAY + USG + Cardiac + Pulmonary/Neuro tests, ~95 options), no prices.
- Navigation (desktop + mobile) "Book Appointment" → `Link` to `/book-appointment`.
- Footer Quick Links "Book Appointment" → `Link` to `/book-appointment`.
- Form submits to `${REACT_APP_BACKEND_URL}/api/appointment`; success Alert + `form.reset()` + redirect to `/appointment-confirmation`.
- Twilio creds + clinic number stored in `/app/backend/.env`.

## Test Status
- 100% backend (pytest 11/11) + 100% frontend (Playwright e2e) per `/app/test_reports/iteration_1.json`.
- Real Twilio send confirmed (`whatsappSent: true`).

## User Personas
- **Patient** — books a diagnostic test online.
- **Clinic staff** — receives WhatsApp notification on `+91-7303034849`.

## Backlog / Future
- P2: Move 95-item testOptions array to a constants file.
- P2: Tighten CORS `allow_origins` from `*` for production.
- P2: Rotate Twilio auth token before production launch.
- P2: Switch from Twilio WhatsApp sandbox to approved sender for production.
- P2: Optional email confirmation to patient (via Resend/SendGrid).
- P3: Admin dashboard to view/filter appointments.
