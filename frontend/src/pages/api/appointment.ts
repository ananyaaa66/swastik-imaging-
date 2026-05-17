import twilio from "twilio";

interface AppointmentRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  age: number;
  appointmentDate: string;
  appointmentTime: string;
  testSelection: string;
  additionalNotes?: string;
}

const sendWhatsAppNotification = async (appointment: AppointmentRequest) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const clinicWhatsAppNumber = process.env.CLINIC_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !clinicWhatsAppNumber) {
    throw new Error("Missing Twilio or clinic WhatsApp configuration");
  }

  const client = twilio(accountSid, authToken);

  const message = `🩺 New Appointment Request\n\n👤 Name: ${appointment.fullName}\n📞 Phone: +91 ${appointment.phoneNumber}\n📧 Email: ${appointment.email}\n⚧ Gender: ${appointment.gender}\n🎂 Age: ${appointment.age}\n🧪 Test Type: ${appointment.testSelection}\n📅 Date: ${new Date(appointment.appointmentDate).toLocaleDateString("en-IN")}\n⏰ Time: ${appointment.appointmentTime}${appointment.additionalNotes ? `\n📝 Note: ${appointment.additionalNotes}` : ""}`;

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${clinicWhatsAppNumber}`,
      body: message,
    });
  } catch (error) {
    console.error("WhatsApp send error:", error);
    throw new Error("Failed to send WhatsApp notification");
  }
};

const validateAppointmentData = (data: any): data is AppointmentRequest => {
  return (
    typeof data.fullName === "string" &&
    typeof data.phoneNumber === "string" &&
    typeof data.email === "string" &&
    typeof data.gender === "string" &&
    typeof data.age === "number" &&
    typeof data.appointmentDate === "string" &&
    typeof data.appointmentTime === "string" &&
    typeof data.testSelection === "string" &&
    (typeof data.additionalNotes === "string" || data.additionalNotes === undefined)
  );
};

export const handler = async (request: Request) => {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    // Validate request data
    if (!validateAppointmentData(body)) {
      return new Response(
        JSON.stringify({ message: "Invalid appointment data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(body.phoneNumber)) {
      return new Response(
        JSON.stringify({ message: "Invalid phone number format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ message: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate age
    if (body.age < 1 || body.age > 150) {
      return new Response(JSON.stringify({ message: "Invalid age" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate appointment date is in the future
    const appointmentDate = new Date(body.appointmentDate);
    if (appointmentDate <= new Date()) {
      return new Response(
        JSON.stringify({ message: "Appointment date must be in the future" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Send WhatsApp notification
    await sendWhatsAppNotification(body);

    return new Response(
      JSON.stringify({
        message: "Appointment booked successfully",
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Appointment booking error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export default handler;
