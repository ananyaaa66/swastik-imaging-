# Quick Start Guide - Appointment Booking System

## 5-Minute Setup

### Step 1: Set Twilio Credentials (Required)
Edit `.env.local`:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
CLINIC_WHATSAPP_NUMBER=whatsapp:+917303034849
PORT=3001
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Servers
```bash
npm run dev
```

Your app will be at: `http://localhost:8080`

---

## What Was Built

### ✅ Frontend Form (`/book-appointment`)
- Professional, clean design
- 9 form fields with validation
- Loading states and success/error messages
- Mobile responsive
- Test options: Ultrasound, X-Ray, ECG, Blood Tests

### ✅ Backend API (`/api/appointment`)
- Handles form submissions
- Validates all data server-side
- Sends WhatsApp messages via Twilio
- Secure error handling

### ✅ Confirmation Page (`/appointment-confirmation`)
- Shows booked appointment details
- Next steps instructions
- Call clinic button

---

## How It Works

1. User fills appointment form at `/book-appointment`
2. Form validates all fields client-side
3. Submit button sends POST to `/api/appointment`
4. Backend validates data and sends WhatsApp message
5. User redirected to confirmation page
6. Clinic receives WhatsApp notification

---

## Environment Variables

| Variable | Value | Example |
|----------|-------|---------|
| TWILIO_ACCOUNT_SID | Your Twilio Account ID | AC1234567890abcdef |
| TWILIO_AUTH_TOKEN | Your Twilio Auth Token | abc123xyz |
| CLINIC_WHATSAPP_NUMBER | Clinic WhatsApp number | whatsapp:+917303034849 |
| PORT | Backend server port | 3001 |

**Get Twilio credentials:** https://console.twilio.com

---

## Form Fields

| Field | Type | Validation |
|-------|------|-----------|
| Full Name | Text | Min 2 chars |
| Phone | Number | Exactly 10 digits |
| Email | Email | Valid format |
| Gender | Select | Male/Female/Other |
| Age | Number | 1-150 |
| Test Type | Select | Ultrasound/X-Ray/ECG/Blood Tests |
| Date | Date | Future date only |
| Time | Select | 9 AM - 5 PM slots |
| Notes | Textarea | Optional |

---

## API Endpoint

**POST** `http://localhost:3001/api/appointment`

**Request:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "9876543210",
  "email": "john@example.com",
  "gender": "Male",
  "age": 30,
  "appointmentDate": "2024-12-25",
  "appointmentTime": "10:00 AM",
  "testSelection": "Blood Tests",
  "additionalNotes": "Fasting required"
}
```

**Success (200):**
```json
{
  "message": "Appointment booked successfully",
  "success": true
}
```

---

## Testing the Form

1. Go to `http://localhost:8080/book-appointment`
2. Fill all fields:
   - Name: John Doe
   - Phone: 9876543210
   - Email: john@example.com
   - Gender: Male
   - Age: 30
   - Test: Blood Tests
   - Date: Tomorrow's date
   - Time: 10:00 AM
3. Click "Book Appointment"
4. See success message
5. Check WhatsApp at clinic number for notification

---

## Troubleshooting

**"Cannot connect to backend"**
- Ensure both servers running: `npm run dev`
- Check `http://localhost:3001` is accessible
- Verify port 3001 is not in use

**"WhatsApp message not sending"**
- Check Twilio credentials in `.env.local`
- Verify Twilio account has balance
- Check server logs for error messages

**"Form validation errors"**
- Phone must be 10 digits
- Date must be in future
- Email must be valid format
- Age must be 1-150

---

## File Changes Summary

**New Files Created:**
- `src/pages/BookAppointment.tsx` - Form component
- `src/pages/AppointmentConfirmation.tsx` - Confirmation page
- `src/pages/api/appointment.ts` - API handler
- `server.ts` - Express backend
- `.env.local` - Environment variables

**Files Modified:**
- `src/pages/Index.tsx` - Links updated to booking form
- `vite.config.ts` - API proxy added
- `package.json` - New dev scripts

---

## Commands Reference

```bash
# Start both frontend and backend
npm run dev

# Frontend only (port 8080)
npm run dev:frontend

# Backend only (port 3001)
npm run dev:backend

# Build for production
npm run build

# Type checking
npm run typecheck

# Run tests
npm test
```

---

## Next: Production Deployment

For production:
1. Deploy Express backend to server (Heroku, Railway, AWS, etc.)
2. Update API URL in frontend
3. Update environment variables on production server
4. Build and deploy frontend
5. Test WhatsApp integration in production

---

## Support Files

- `APPOINTMENT_SETUP.md` - Detailed setup guide
- `QUICK_START.md` - This file
- Code comments in each file for reference

---

## Architecture

```
Client (React)
    ↓
    /api/appointment (POST)
    ↓
Backend (Express)
    ↓
Twilio API
    ↓
WhatsApp (Clinic)
```

---

**Created:** Complete Appointment Booking System
**Tech Stack:** React, TypeScript, TailwindCSS, Express, Twilio
**Status:** Ready to deploy
