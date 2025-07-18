const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAppointmentEmails = async (appointment) => {
  try {
    // Send to clinic
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CLINIC_EMAIL,
      subject: `New Appointment: ${appointment.patientName} - ${appointment.testType}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Patient:</strong> ${appointment.patientName}</p>
        <p><strong>Test:</strong> ${appointment.testType}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Contact:</strong> ${appointment.phone} | ${appointment.email}</p>
        <p><strong>Notes:</strong> ${appointment.notes || 'None'}</p>
      `
    });

    // Send to patient
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: appointment.email,
      subject: `Appointment Confirmation - Swastik Imaging`,
      html: `
        <h2>Your appointment is confirmed!</h2>
        <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
        <p><strong>Test Type:</strong> ${appointment.testType}</p>
        <p><strong>Date:</strong> ${appointment.date}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Address:</strong> Your Clinic Address Here</p>
        <p>Thank you for choosing Swastik Imaging Diagnostics!</p>
      `
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send confirmation emails');
  }
};

module.exports = { sendAppointmentEmails };