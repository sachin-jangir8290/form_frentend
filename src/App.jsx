import React, { useEffect } from 'react';
import FloatingButton from './fixed_button/FloatingButton';

function App() {
  // Track when user views the form page
  useEffect(() => {
    fetch('https://form-backend-mu.vercel.app/api/form-viewed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: "aiFORM_29Vv8Kkd3HrT3zfQbNhpF85mV",
        time: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        page: window.location.href
      }),
    }).catch(err => console.error('Form viewed tracking failed:', err));
  }, []);

  return (
    <>
      <FloatingButton />
    </>
  );
}

export default App;
