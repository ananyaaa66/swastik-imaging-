const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Initialize database table
const initDB = async () => {
  const { error } = await supabase
    .from('appointments')
    .create([
      {
        patient_name: 'text',
        email: 'text',
        phone: 'text',
        appointment_date: 'date',
        appointment_time: 'text',
        test_type: 'text',
        notes: 'text',
        status: 'text',
        created_at: 'timestamp with time zone default now()'
      }
    ], { if_not_exists: true });
  
  if (error) console.error('DB initialization error:', error);
  else console.log('Supabase table ready');
};

module.exports = { supabase, initDB };