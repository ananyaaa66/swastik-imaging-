import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

const clinicNumber = 'whatsapp:+917303034849'; // Replace with clinic WhatsApp number
const fromTwilio = 'whatsapp:1 415 523 8886'; // Twilio sandbox number

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, testType, date, time } = req.body;

  const messageBody = `
🧾 *New Appointment Booking*

👤 Name: ${name}
📞 Phone: ${phone}
✉️ Email: ${email}
🧪 Test Type: ${testType}
📅 Date: ${date}
⏰ Time: ${time}
  `;

  try {
    await client.messages.create({
      from: fromTwilio,
      to: clinicNumber,
      body: messageBody,
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Twilio Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
