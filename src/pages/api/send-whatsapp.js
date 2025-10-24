// /pages/api/send-whatsapp.js

import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, testType, slotTime, note } = req.body;

  if (!name || !phone || !email || !testType || !slotTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const messageBody = `
📅 *New Appointment Booking*
👤 Name: ${name}
📱 Phone: ${phone}
📧 Email: ${email}
🧪 Test Type: ${testType}
🕒 Slot: ${slotTime}
📝 Note: ${note || 'None'}
`;

    const message = await client.messages.create({
      body: messageBody,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: 'whatsapp:+917303034849' // Replace with the clinic's number
    });

    return res.status(200).json({ success: true, sid: message.sid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}


