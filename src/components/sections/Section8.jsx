import React from 'react';
import ReportDisplay from '../ReportDisplay';
import ContactForm from '../ContactForm';

const Section8 = ({ reportHtml, onSubmit, formData, onInputChange }) => {
  return (
    <div className="fieldset-container active" id="section-modal-8">
      <div className="submit-section">
        <h3>Review and Submit</h3>
        <p>Please review your report below and provide your contact information to receive it via email.</p>

        <ReportDisplay reportHtml={reportHtml} onSubmit={onSubmit} />

        {/* Contact Information Section */}
        <div className="contact-fields">
          <h3>📧 Your Contact Information</h3>
          <p>Please provide your details to receive the detailed report via email.</p>
          <ContactForm formData={formData} onInputChange={onInputChange} />
        </div>
      </div>
    </div>
  );
};

export default Section8;