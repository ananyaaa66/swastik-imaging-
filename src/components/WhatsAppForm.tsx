import React, { useState } from 'react';

const WhatsAppForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [testType, setTestType] = useState<string>('');
  const [slotTime, setSlotTime] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  /* Disabled: original submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          testType,
          slotTime,
          note,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setTestType('');
        setSlotTime('');
        setNote('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };
  */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form /* onSubmit={handleSubmit} */ onSubmit={(e) => e.preventDefault()} className="whatsapp-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
      />
      <input
        type="text"
        value={testType}
        onChange={(e) => setTestType(e.target.value)}
        placeholder="Test Type (e.g., MRI, X-Ray)"
        required
      />
      <input
        type="text"
        value={slotTime}
        onChange={(e) => setSlotTime(e.target.value)}
        placeholder="Preferred Slot Timing"
        required
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Additional Note (Optional)"
      ></textarea>

      {/* Disabled submit in favor of direct call */}
      {/* <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Book Appointment'}
      </button> */}
      <a href="tel:+917303034849">
        <button type="button">
          Call +91 7303034849
        </button>
      </a>

      {status === 'success' && <p>✅ Appointment sent via WhatsApp!</p>}
      {status === 'error' && <p>❌ Failed to send appointment. Please try again.</p>}
    </form>
  );
};

export default WhatsAppForm;
