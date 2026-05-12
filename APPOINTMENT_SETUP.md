# Appointment Booking System Setup Guide

## Overview
This is a complete appointment booking system for Swastik Imaging & Diagnostics with frontend form and Twilio WhatsApp integration for clinic notifications.

## Components Created

### Frontend
- **`src/pages/BookAppointment.tsx`** - Appointment booking form with validation
- **`src/pages/AppointmentConfirmation.tsx`** - Confirmation page after successful booking
- **Updated `src/pages/Index.tsx`** - Links appointment CTAs to the booking form

### Backend
- **`src/pages/api/appointment.ts`** - TypeScript API handler with Twilio integration
- **`server.ts`** - Express backend server for handling API requests
- **`vite.config.ts`** - Updated to proxy API requests

### Configuration
- **`.env.local`** - Environment variables for Twilio credentials
- **`package.json`** - Updated scripts for running frontend and backend servers

## Installation & Setup

### 1. Install Dependencies
All required packages are already installed. The key ones are:
```bash
npm install
npm install --save-dev concurrently tsx
npm install --save express dotenv
```

**Note:** Twilio is already in `package.json` as a dependency.

### 2. Configure Environment Variables

Edit `.env.local` in the project root:

```env
# Twilio Configuration (Get from https://console.twilio.com)
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here

# Clinic WhatsApp Number
CLINIC_WHATSAPP_NUMBER=whatsapp:+917303034849

# Server Port
PORT=3001
```

**Where to get Twilio credentials:**
1. Go to https://console.twilio.com
2. Navigate to Account Settings
3. Copy your Account SID and Auth Token
4. The Twilio Sandbox number is: `whatsapp:+14155238886` (already configured)

### 3. Run the Application

**Development Mode (runs both frontend and backend):**
```bash
npm run dev
```

This will start:
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3001`

**Individual Commands:**
```bash
npm run dev:frontend   # Only frontend (port 8080)
npm run dev:backend    # Only backend (port 3001)
```

**Production Build:**
```bash
npm run build
```

## Form Features

### Form Fields
- **Patient Full Name** - Text input, min 2 characters
- **Phone Number** - 10-digit number validation
- **Email Address** - Email format validation
- **Gender** - Dropdown (Male, Female, Other)
- **Age** - Number input, 1-150 range
- **Test Selection** - Dropdown with services:
  - Ultrasound
  - X-Ray
  - ECG
  - Blood Tests
- **Appointment Date** - Date picker, must be future date
- **Appointment Time** - Dropdown (9 AM - 5 PM in hourly slots)
- **Additional Notes** - Optional textarea for medical information

### Validation
- All required fields are validated
- Phone number must be exactly 10 digits
- Email must be valid format
- Age must be between 1-150
- Appointment date must be in the future
- Real-time validation feedback

### User Experience
- Loading state while submitting with spinner
- Success message with automatic redirect to confirmation
- Error messages with details
- Mobile responsive design
- Disabled form during submission

## WhatsApp Message Format

When a patient books an appointment, the clinic receives:

```
🩺 New Appointment Request

👤 Name: [Patient Name]
📞 Phone: +91 [Phone Number]
📧 Email: [Email Address]
⚧ Gender: [Gender]
🎂 Age: [Age]
🧪 Test Type: [Selected Test]
📅 Date: [Appointment Date]
⏰ Time: [Appointment Time]
📝 Note: [Additional Notes if provided]
```

**Message is sent to:** `whatsapp:+917303034849` (Clinic WhatsApp number)
**From:** `whatsapp:+14155238886` (Twilio Sandbox)

## API Endpoint

**POST `/api/appointment`**

### Request Body
```json
{
  "fullName": "string",
  "phoneNumber": "string (10 digits)",
  "email": "string",
  "gender": "Male | Female | Other",
  "age": "number",
  "appointmentDate": "YYYY-MM-DD",
  "appointmentTime": "string",
  "testSelection": "Ultrasound | X-Ray | ECG | Blood Tests",
  "additionalNotes": "string (optional)"
}
```

### Success Response (200)
```json
{
  "message": "Appointment booked successfully",
  "success": true
}
```

### Error Response (400/500)
```json
{
  "message": "Error description"
}
```

## Server-side Validation

The API validates:
1. Phone number format (10 digits only)
2. Email format (valid email)
3. Age range (1-150)
4. Appointment date is in the future
5. Required fields are present
6. Data types are correct

## Styling

The form uses:
- **TailwindCSS** - Utility-first styling
- **Medical color scheme** - Green primary color (#00704A)
- **Responsive grid layout** - Works on mobile, tablet, desktop
- **Radix UI components** - For accessible form inputs
- **Icons from Lucide React** - Professional iconography

## Troubleshooting

### Backend not responding
- Check if `server.ts` is running on port 3001
- Verify `.env.local` file exists with correct variables
- Check browser console for network errors

### WhatsApp message not sending
- Verify Twilio credentials in `.env.local`
- Check Twilio account has active balance
- Ensure clinic WhatsApp number is correct
- Check server logs for Twilio error messages

### Form validation errors
- Check if form fields match expected formats
- Verify phone number is exactly 10 digits
- Ensure appointment date is in the future
- Check email format is valid

### Port conflicts
- If port 8080 is in use, Vite will use next available port
- If port 3001 is in use, change `PORT` in `.env.local`

## File Structure

```
project-root/
├── src/
│   ├── pages/
│   │   ├── BookAppointment.tsx      # Booking form
│   │   ├── AppointmentConfirmation.tsx  # Confirmation page
│   │   ├── Index.tsx                # Updated home page
│   │   └── api/
│   │       └── appointment.ts       # API handler
│   └── components/
│       └── ui/
│           ├── form.tsx
│           ├── input.tsx
│           └── textarea.tsx
├── server.ts                        # Express backend
├── vite.config.ts                   # Updated with API proxy
├── .env.local                       # Environment variables
└── package.json                     # Updated scripts

```

## Security Considerations

- API validates all input data
- Twilio credentials stored in `.env.local` (never commit)
- Phone numbers limited to 10 digits
- Email format validation
- Age range validation
- Future date validation for appointments
- CORS handled via Express proxy
- Request method validation (POST only)

## Next Steps

1. Get Twilio account and credentials
2. Add credentials to `.env.local`
3. Test the form by booking an appointment
4. Verify WhatsApp message is received
5. Deploy backend server for production
6. Update clinic WhatsApp number if different

## Support

For issues:
1. Check server logs: `npm run dev`
2. Check browser console for frontend errors
3. Verify `.env.local` configuration
4. Check Twilio account status and balance
5. Verify network requests in browser DevTools
