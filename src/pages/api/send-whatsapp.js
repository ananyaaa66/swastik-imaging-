// pages/api/send-whatsapp.js

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, date, time, phone, email, textType, note } = req.body;

  if (!name || !date || !time || !phone || !email || !textType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio Sandbox number
      to: 'whatsapp:+91XXXXXXXXXX',  // Replace with clinic's number
      body: `🩺 *New Appointment Request*

👤 *Name*: ${name}
📅 *Date*: ${date}
⏰ *Time*: ${time}
📞 *Phone*: ${phone}
📧 *Email*: ${email}
🧪 *Test Type*: ${textType}
📝 *Note*: ${note || 'N/A'}`
    });

    return res.status(200).json({ success: true, sid: message.sid });
  } catch (error) {
    console.error('Twilio Error:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
