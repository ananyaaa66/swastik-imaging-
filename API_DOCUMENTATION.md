# Appointment API Documentation

## Overview

The Appointment API handles booking appointments with full Twilio WhatsApp integration for clinic notifications.

**Base URL:** `http://localhost:3001`
**Version:** 1.0.0
**Protocol:** HTTP/HTTPS

---

## Endpoint: Book Appointment

### Request

**Method:** `POST`
**URL:** `/api/appointment`
**Content-Type:** `application/json`

### Request Body

```json
{
  "fullName": "string",
  "phoneNumber": "string",
  "email": "string",
  "gender": "string",
  "age": "number",
  "appointmentDate": "string",
  "appointmentTime": "string",
  "testSelection": "string",
  "additionalNotes": "string (optional)"
}
```

### Request Parameters

| Field | Type | Required | Rules | Example |
|-------|------|----------|-------|---------|
| fullName | string | ✅ Yes | Min 2 characters | "John Doe" |
| phoneNumber | string | ✅ Yes | Exactly 10 digits | "9876543210" |
| email | string | ✅ Yes | Valid email format | "john@example.com" |
| gender | string | ✅ Yes | Male, Female, or Other | "Male" |
| age | number | ✅ Yes | 1-150 | 30 |
| appointmentDate | string | ✅ Yes | ISO format (YYYY-MM-DD), future date | "2024-12-25" |
| appointmentTime | string | ✅ Yes | HH:MM AM/PM format | "10:00 AM" |
| testSelection | string | ✅ Yes | One of 4 services | "Blood Tests" |
| additionalNotes | string | ❌ No | Any text | "Fasting required" |

### Allowed Test Types

- `Ultrasound`
- `X-Ray`
- `ECG`
- `Blood Tests`

### Allowed Time Slots

- `09:00 AM`
- `10:00 AM`
- `11:00 AM`
- `12:00 PM`
- `02:00 PM`
- `03:00 PM`
- `04:00 PM`
- `05:00 PM`

---

## Response Format

### Success Response (HTTP 200)

```json
{
  "message": "Appointment booked successfully",
  "success": true
}
```

**Headers:**
```
Content-Type: application/json
```

### Error Responses

#### 400 Bad Request - Invalid Data

```json
{
  "message": "Invalid phone number format"
}
```

**Common Messages:**
- `"Invalid appointment data"`
- `"Invalid phone number format"`
- `"Invalid email format"`
- `"Invalid age"`
- `"Appointment date must be in the future"`

#### 405 Method Not Allowed

```json
{
  "message": "Method not allowed"
}
```

**Cause:** Using GET, PUT, DELETE, etc. instead of POST

#### 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

**Possible Causes:**
- Missing Twilio credentials
- Twilio API error
- Invalid Twilio account
- WhatsApp message send failed

---

## CURL Examples

### Basic Request

```bash
curl -X POST http://localhost:3001/api/appointment \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "9876543210",
    "email": "john@example.com",
    "gender": "Male",
    "age": 30,
    "appointmentDate": "2024-12-25",
    "appointmentTime": "10:00 AM",
    "testSelection": "Blood Tests",
    "additionalNotes": "Fasting required"
  }'
```

### With Additional Notes

```bash
curl -X POST http://localhost:3001/api/appointment \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "phoneNumber": "9123456789",
    "email": "jane@example.com",
    "gender": "Female",
    "age": 28,
    "appointmentDate": "2024-12-26",
    "appointmentTime": "02:00 PM",
    "testSelection": "Ultrasound",
    "additionalNotes": "Please bring previous reports"
  }'
```

---

## JavaScript/Fetch Example

```javascript
async function bookAppointment(formData) {
  try {
    const response = await fetch('/api/appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to book appointment');
    }

    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Usage
const appointmentData = {
  fullName: 'John Doe',
  phoneNumber: '9876543210',
  email: 'john@example.com',
  gender: 'Male',
  age: 30,
  appointmentDate: '2024-12-25',
  appointmentTime: '10:00 AM',
  testSelection: 'Blood Tests',
  additionalNotes: 'Fasting required',
};

bookAppointment(appointmentData);
```

---

## Python Example

```python
import requests
import json

def book_appointment(appointment_data):
    url = 'http://localhost:3001/api/appointment'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, 
                            json=appointment_data,
                            headers=headers)
    
    if response.status_code == 200:
        print('Success:', response.json())
    else:
        print('Error:', response.json())
    
    return response.json()

# Usage
data = {
    'fullName': 'John Doe',
    'phoneNumber': '9876543210',
    'email': 'john@example.com',
    'gender': 'Male',
    'age': 30,
    'appointmentDate': '2024-12-25',
    'appointmentTime': '10:00 AM',
    'testSelection': 'Blood Tests',
    'additionalNotes': 'Fasting required'
}

result = book_appointment(data)
```

---

## Validation Rules

### Phone Number
- Must be exactly 10 digits
- No special characters
- No country code needed (assumes India)
- Examples:
  - ✅ `9876543210`
  - ❌ `+919876543210` (with country code)
  - ❌ `987654321` (too short)
  - ❌ `98765432100` (too long)

### Email
- Must be valid email format
- Must contain @ and domain
- Examples:
  - ✅ `john@example.com`
  - ❌ `john@` (no domain)
  - ❌ `john.example.com` (no @)

### Age
- Must be between 1-150
- Must be a number
- Examples:
  - ✅ `30`
  - ❌ `-5` (negative)
  - ❌ `200` (unrealistic)

### Appointment Date
- Must be ISO format (YYYY-MM-DD)
- Must be in the future
- Cannot be today or past
- Examples:
  - ✅ `2024-12-25` (future)
  - ❌ `2024-01-01` (past)
  - ❌ `12/25/2024` (wrong format)

### Gender
- Must be one of:
  - `Male`
  - `Female`
  - `Other`
- Case-sensitive

### Test Selection
- Must be one of:
  - `Ultrasound`
  - `X-Ray`
  - `ECG`
  - `Blood Tests`
- Case-sensitive

---

## WhatsApp Message Details

### Message Format

When an appointment is booked, the clinic receives a WhatsApp message with this format:

```
🩺 New Appointment Request

👤 Name: [fullName]
📞 Phone: +91 [phoneNumber]
📧 Email: [email]
⚧ Gender: [gender]
🎂 Age: [age]
🧪 Test Type: [testSelection]
📅 Date: [formatted appointmentDate]
⏰ Time: [appointmentTime]
📝 Note: [additionalNotes if provided]
```

### Message Delivery

| Component | Value |
|-----------|-------|
| From | whatsapp:+14155238886 (Twilio Sandbox) |
| To | whatsapp:+917303034849 (Clinic) |
| Type | Text message |
| Encoding | UTF-8 |
| Emoji Support | Yes |

---

## Rate Limiting

**Current:** No rate limiting
**Recommended:** Implement rate limiting in production

```
- Max 10 requests per minute per IP
- Max 100 requests per hour per IP
- Max 1000 requests per day per IP
```

---

## Authentication

**Current:** No authentication required
**Production:** Consider adding:
- API key authentication
- JWT tokens
- Request signing

---

## CORS Headers

**Configured For:** Local development
**Production:** Update vite.config.ts and server.ts for production domain

```javascript
// Allow specific origin
cors({
  origin: 'https://yourdomain.com',
  credentials: true
})
```

---

## Pagination

**Not Applicable** - Single appointment endpoint

---

## Webhooks

**Not Implemented** - Current version doesn't support webhooks

For production, consider adding:
- WhatsApp delivery confirmation webhook
- SMS receipt webhook
- Email confirmation webhook

---

## Status Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Appointment booked |
| 400 | Bad Request | Invalid phone format |
| 405 | Method Not Allowed | Using GET instead of POST |
| 500 | Server Error | Twilio API error |

---

## Error Handling

### Client-Side
- Validate before sending
- Show user-friendly error messages
- Retry on network errors

### Server-Side
- Validate all inputs
- Log errors for debugging
- Return meaningful error messages
- Don't expose sensitive details

---

## Testing the API

### With Postman

1. **Create New Request**
   - Method: POST
   - URL: `http://localhost:3001/api/appointment`

2. **Set Headers**
   - Content-Type: application/json

3. **Set Body** (raw JSON)
   ```json
   {
     "fullName": "Test User",
     "phoneNumber": "9876543210",
     "email": "test@example.com",
     "gender": "Male",
     "age": 30,
     "appointmentDate": "2024-12-25",
     "appointmentTime": "10:00 AM",
     "testSelection": "Blood Tests"
   }
   ```

4. **Send Request**
5. **Check Response**

### With VS Code REST Client

```rest
### Book Appointment
POST http://localhost:3001/api/appointment
Content-Type: application/json

{
  "fullName": "Test User",
  "phoneNumber": "9876543210",
  "email": "test@example.com",
  "gender": "Male",
  "age": 30,
  "appointmentDate": "2024-12-25",
  "appointmentTime": "10:00 AM",
  "testSelection": "Blood Tests"
}
```

---

## Troubleshooting

### 405 Method Not Allowed
- Ensure using POST method
- Not GET, PUT, DELETE, etc.

### 400 Invalid Data
- Check all required fields present
- Verify data types match
- Check date format (YYYY-MM-DD)
- Check phone is 10 digits

### 500 Server Error
- Check Twilio credentials in .env.local
- Check Twilio account has balance
- Check server logs
- Verify clinic WhatsApp number

### No WhatsApp Message
- Verify Twilio credentials
- Check Twilio console logs
- Verify clinic phone number
- Check Twilio account balance

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Full form validation
- Twilio WhatsApp integration
- Error handling
- TypeScript support

---

## Support

For API questions or issues:

1. Check API_DOCUMENTATION.md (this file)
2. See APPOINTMENT_SETUP.md for troubleshooting
3. Check Twilio console for errors
4. Review server logs

---

**Last Updated:** 2024
**Status:** Active & Production Ready ✅
