import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(res => res.text())
      .then(setMessage)
      .catch(() => setMessage('Failed to connect to backend.'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Backend Response</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
