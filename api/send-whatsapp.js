// import Twilio from "twilio"; // Disabled per request

export default async function handler(req, res) {
  const corsOrigin = process.env.CORS_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";
  const to = process.env.CLINIC_WHATSAPP_TO || "whatsapp:+917303034849";

  // Disabled Twilio environment and format checks per request

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

  // Disabled Twilio WhatsApp send per request
  // const client = new Twilio(accountSid, authToken);
  // await client.messages.create({ from, to, body: messageText });
  res
    .status(200)
    .json({ ok: true, disabled: true, message: "WhatsApp sending disabled" });
}
