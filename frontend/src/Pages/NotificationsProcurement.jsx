import React, { useState } from 'react';

const NotificationsProcurement = () => {
  const [selected, setSelected] = useState([]);
  const [email, setEmail] = useState('');

  const handleCheck = (e) => {
    const value = e.target.value;
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/notification-procurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected, email }),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Clear form after submission
        setSelected([]);
        setEmail('');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit form: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  // Inline styles
  const formStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 5px #aaa',
    textAlign: 'center',
    maxWidth: '400px',
    margin: 'auto',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginTop: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.5rem 2rem',
    backgroundColor: '#884a0a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Procurement Selection</h2>
      {[1, 2, 3, 4].map((num) => (
        <label key={num} style={labelStyle}>
          <input
            type="checkbox"
            value={`Procurement-${num}`}
            onChange={handleCheck}
            checked={selected.includes(`Procurement-${num}`)}
          />
          {' '}Procurement-{num}
        </label>
      ))}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
};

export default NotificationsProcurement;
