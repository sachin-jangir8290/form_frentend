import React, { useState, useEffect } from 'react';
import ScrollableForm from './components/ScrollableForm';
import './styles/SuspensionChecker.css';

const GBPFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [finalReport, setFinalReport] = useState('');

  // Track when form is opened
  useEffect(() => {
    if (isOpen) {
      // Send notification when form is opened
      fetch("https://form-backend-mu.vercel.app/api/form-open", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "aiFORM_29Vv8Kkd3HrT3zfQbNhpF85mV",
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct',
        }),
      }).catch(err => console.error('Form open tracking failed:', err));
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleGenerateReport = (report) => {
    console.log('Report received in GBPFormModal:', report);
    setFinalReport(report);
    console.log('finalReport state set to:', report);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch("https://form-backend-mu.vercel.app/api/form", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Success: " + result.message);
        form.reset();
        onClose();
      } else {
        alert("❌ Error: " + (result.error || "Failed to submit"));
      }
    } catch (err) {
      alert("❌ Network Error");
      console.error(err);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content scrollable-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>GBP Suspension Checker</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form id="suspension-form-modal" className="form-container-main" onSubmit={submitForm}>
            <input type="hidden" name="apiKey" value="aiFORM_29Vv8Kkd3HrT3zfQbNhpF85mV" />

            <ScrollableForm
              formData={formData}
              onInputChange={handleInputChange}
              onCheckboxChange={handleCheckboxChange}
              onGenerateReport={handleGenerateReport}
              onSubmit={submitForm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GBPFormModal;