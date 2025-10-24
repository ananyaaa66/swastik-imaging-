import Twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"
  const to = process.env.CLINIC_WHATSAPP_TO; // e.g. "whatsapp:+91XXXXXXXXXX"

  if (!accountSid || !authToken || !from || !to) {
    res.status(500).json({ error: "Missing Twilio configuration." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { name, phone, email, date, time, tests, additionalInfo } = body || {};

  if (
    !name ||
    !phone ||
    !date ||
    !time ||
    !Array.isArray(tests) ||
    tests.length === 0
  ) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const messageText = `New Appointment Booking\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "N/A"}\nDate: ${date}\nTime: ${time}\nTests: ${tests.join(", ")}\nAdditional Note: ${additionalInfo || "N/A"}`;

  try {
    const client = new Twilio(accountSid, authToken);
    await client.messages.create({ from, to, body: messageText });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Twilio error", err?.message);
    res.status(500).json({ error: "Failed to send WhatsApp message." });
  }
}
