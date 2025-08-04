import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Validate environment variables on startup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clinicNumber = process.env.CLINIC_WHATSAPP_NUMBER;
const fromTwilio = process.env.TWILIO_SANDBOX_NUMBER;

if (!accountSid || !authToken || !clinicNumber || !fromTwilio) {
  console.error('❌ Missing Twilio environment variables:');
  console.error(`TWILIO_ACCOUNT_SID: ${accountSid ? '✅' : '❌'}`);
  console.error(`TWILIO_AUTH_TOKEN: ${authToken ? '✅' : '❌'}`);
  console.error(`CLINIC_WHATSAPP_NUMBER: ${clinicNumber ? '✅' : '❌'}`);
  console.error(`TWILIO_SANDBOX_NUMBER: ${fromTwilio ? '✅' : '❌'}`);
  throw new Error('Twilio environment variables not configured');
}

const client = twilio(accountSid, authToken);

// TypeScript interface for appointment data
interface AppointmentData {
  name: string;
  phone: string;
  email: string;
  testType: string;
  date: string;
  time: string;
}

// Validate request data format
const isValidAppointment = (data: any): data is AppointmentData => {
  return (
    typeof data?.name === 'string' &&
    typeof data?.phone === 'string' &&
    typeof data?.email === 'string' &&
    typeof data?.testType === 'string' &&
    typeof data?.date === 'string' &&
    typeof data?.time === 'string'
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Configure CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://swastikmedscan.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'Only POST requests are accepted' 
    });
  }

  // Validate content type
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({
      error: 'Invalid content type',
      message: 'Only application/json is accepted'
    });
  }

  // Validate request body format
  if (!isValidAppointment(req.body)) {
    return res.status(400).json({
      error: 'Invalid request body',
      required_fields: {
        name: 'string',
        phone: 'string',
        email: 'string',
        testType: 'string',
        date: 'string',
        time: 'string'
      }
    });
  }

  // Extract validated data
  const { name, phone, email, testType, date, time } = req.body;

  // Create WhatsApp message
  const whatsappMessage = `
🧾 *New Appointment Request* 🧾

👤 *Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}
🧪 *Test Type:* ${testType}
📅 *Date:* ${date}
⏰ *Time:* ${time}

_Sent from swastikmedscan.com_
  `.trim();

  try {
    // Send WhatsApp message via Twilio
    await client.messages.create({
      body: whatsappMessage,
      from: fromTwilio,
      to: clinicNumber
    });

    console.log(`✅ Appointment sent for ${name}`);
    return res.status(200).json({ 
      success: true,
      message: 'Appointment details sent to clinic'
    });
  } catch (error: any) {
    // Detailed error logging
    console.error('❌ Twilio error:', error);
    
    return res.status(500).json({
      error: 'Failed to send appointment',
      message: error.message || 'Twilio API error',
      twilioCode: error.code || 'UNKNOWN'
    });
  }
}