import React from 'react';

const ContactForm = ({ formData, onInputChange }) => {
  return (
    <div className="contact-fields">
      <h3>📧 Your Contact Information</h3>
      <p>Please provide your details to receive the detailed report via email.</p>

      <div className="input-group">
        <input
          type="text"
          id="business-name-modal"
          name="business_name"
          value={formData.business_name || ''}
          onChange={onInputChange}
          placeholder=" "
          required
        />
        <label htmlFor="business-name-modal">Business Name</label>
      </div>

      <div className="input-group">
        <input
          type="email"
          id="user-email-modal"
          name="email"
          value={formData.email || ''}
          onChange={onInputChange}
          placeholder=" "
          required
        />
        <label htmlFor="user-email-modal">Email Address</label>
      </div>

      <div className="input-group">
        <input
          type="tel"
          id="user-phone-modal"
          name="phone"
          value={formData.phone || ''}
          onChange={onInputChange}
          placeholder=" "
          required
        />
        <label htmlFor="user-phone-modal">Phone Number</label>
      </div>

      <div className="input-group">
        <input
          type="url"
          id="gmb-url-modal"
          name="gmb_url"
          value={formData.gmb_url || ''}
          onChange={onInputChange}
          placeholder="https://maps.google.com/..."
        />
        <label htmlFor="gmb-url-modal">GMB URL (Optional)</label>
      </div>
    </div>
  );
};

export default ContactForm;