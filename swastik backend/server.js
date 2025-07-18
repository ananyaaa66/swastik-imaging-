require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { supabase } = require('./supabase');
const { sendAppointmentEmails } = require('./emailService');

app.use(cors());
app.use(express.json());

// Token-based authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token || token !== process.env.ADMIN_API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Book appointment endpoint
app.post('/api/appointments', async (req, res) => {
  try {
    const { patientName, email, phone, date, time, testType, notes } = req.body;
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        patient_name: patientName,
        email,
        phone,
        appointment_date: date,
        appointment_time: time,
        test_type: testType,
        notes,
        status: 'booked'
      }]);
    
    if (error) throw error;
    
    // Send emails
    await sendAppointmentEmails({
      patientName,
      email,
      phone,
      date,
      time,
      testType,
      notes
    });
    
    res.status(201).json({ 
      message: 'Appointment booked successfully!',
      appointment: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint to get appointments
app.get('/api/admin/appointments', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));