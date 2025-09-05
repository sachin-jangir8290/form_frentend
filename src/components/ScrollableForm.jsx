import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

const ScrollableForm = ({ formData, onInputChange, onCheckboxChange, onGenerateReport, onSubmit }) => {
  const [finalReport, setFinalReport] = useState('');
  const [showDocumentQuestions1, setShowDocumentQuestions1] = useState(false);
  const [showStaffedQuestions, setShowStaffedQuestions] = useState(true);
  const [showDocumentQuestions2, setShowDocumentQuestions2] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Initialize conditional questions based on existing form data
  useEffect(() => {
    if (formData['signage']) {
      const value = formData['signage'];
      setShowDocumentQuestions1(false);
      setShowStaffedQuestions(false);
      setShowDocumentQuestions2(false);

      if (value === 'Yes, permanently visible signage') {
        setShowStaffedQuestions(true);
        setShowDocumentQuestions1(true);
      } else if (value === 'No signage yet') {
        setShowStaffedQuestions(true);
      } else if (value === 'Not applicable (service-area business)') {
        setShowDocumentQuestions2(true);
      }
    }
  }, [formData]);

  const handleSignageChange = (e) => {
    const value = e.target.value;
    onInputChange(e); // Call the parent's input change handler

    // Reset all conditional questions
    setShowDocumentQuestions1(false);
    setShowStaffedQuestions(false);
    setShowDocumentQuestions2(false);

    // Show appropriate conditional questions based on selection
    if (value === 'Yes, permanently visible signage') {
      setShowStaffedQuestions(true);
      setShowDocumentQuestions1(true);
    } else if (value === 'No signage yet') {
      setShowStaffedQuestions(true);
    } else if (value === 'Not applicable (service-area business)') {
      setShowDocumentQuestions2(true);
    }
  };

  const handleGenerateReport = () => {
    if (!disclaimerAccepted) {
      alert('Please read and accept the disclaimer before generating the report.');
      return;
    }

    console.log('Generate Report button clicked');
    console.log('Current form data:', formData);

    // Calculate risk score based on form data
    let totalPoints = 0;
    let maxPoints = 0;

    // Business type scoring
    if (formData['business-type']) {
      maxPoints += 1;
      if (formData['business-type'] === 'Brick-and-mortar store') totalPoints += 1;
      if (formData['business-type'] === 'Home-based business') totalPoints += 0.8;
      if (formData['business-type'] === 'Mobile or service-area business') totalPoints += 0.6;
      if (formData['business-type'] === 'Online-only business') totalPoints += 0.4;
    }

    // Location type scoring
    const locationKeys = Object.keys(formData).filter(key => key.startsWith('location-type-') && formData[key]);
    if (locationKeys.length > 0) {
      maxPoints += 1;
      let locationPoints = 0;
      locationKeys.forEach(key => {
        const locationType = key.replace('location-type-', '');
        if (formData['business-type'] === 'Home-based business') {
          if (locationType === '1') locationPoints = Math.max(locationPoints, 0.5);
          if (locationType === '5') locationPoints = Math.max(locationPoints, 0.5);
        } else if (formData['business-type'] === 'Mobile or service-area business') {
          if (locationType === '5') locationPoints = Math.max(locationPoints, 1);
          else locationPoints = Math.max(locationPoints, 0.5);
        } else {
          if (locationType === '1') locationPoints = Math.max(locationPoints, 1);
          if (locationType === '2') locationPoints = Math.max(locationPoints, 0.6);
          if (locationType === '3') locationPoints = Math.max(locationPoints, 0.4);
        }
      });
      totalPoints += locationPoints;
    }

    // Convert to percentage (lower points = higher risk)
    const riskPercentage = maxPoints > 0 ? Math.round((1 - totalPoints / maxPoints) * 100) : 50;
    const riskLevel = riskPercentage < 30 ? { level: 'Low', class: 'risk-low' } :
                     riskPercentage < 60 ? { level: 'Medium', class: 'risk-medium' } :
                     { level: 'High', class: 'risk-high' };

    let report = `
        <div class="report-section">
            <h2>📊 GBP Suspension Risk Assessment Report</h2>
            <div class="chart-container">
                <div class="chart ${riskLevel.class}">
                    <div>
                        <div class="risk-score">${riskPercentage}%</div>
                        <div>Risk Score</div>
                    </div>
                </div>
            </div>
            <div class="report-section">
                <h3>Risk Level: ${riskLevel.level}</h3>
                <p><strong>Business:</strong> <em>Contact info will be collected in next step</em></p>
                <p><strong>Email:</strong> <em>Contact info will be collected in next step</em></p>
                <p><strong>Phone:</strong> <em>Contact info will be collected in next step</em></p>
                <p><strong>GMB URL:</strong> <em>Contact info will be collected in next step</em></p>
            </div>
            <div class="report-section">
                <h3>📋 Assessment Summary</h3>
                <p><strong>Business Type:</strong> ${formData['business-type'] || 'Not answered'}</p>
                <p><strong>Location Types:</strong> ${Object.keys(formData).filter(key => key.startsWith('location-type-') && formData[key]).map(key => key.replace('location-type-', '')).join(', ') || 'Not answered'}</p>
            </div>
            <div class="report-section">
                <h3>💡 Recommendations</h3>
                <li>Complete all form fields for accurate assessment</li>
                <li>Monitor your GBP regularly</li>
                <li>Address any compliance issues promptly</li>
            </div>
        </div>
    `;
    console.log('Generated report:', report);
    setFinalReport(report);
    onGenerateReport(report);
  };

  return (
    <div className="scrollable-form-container">
      {/* Disclaimer Section */}
      <div className="form-section disclaimer-section">
        <fieldset>
          <legend>⚠️ Important Notice</legend>
          <div className="disclaimer-content">
            <div className="disclaimer-text">
              <p><strong>This form is intended solely to assist users with collecting information related to Google My Business (GMB).</strong></p>
              <p><strong>We are not affiliated with Google or any of its services.</strong></p>
              <p><strong>The content submitted through this form is not reviewed or verified by Google.</strong></p>
              <p>Please ensure you have read and understood Google's official guidelines before proceeding.</p>
              <p>By submitting this form, you acknowledge that you are responsible for complying with Google's policies and that this tool is offered for informational purposes only.</p>
            </div>
            <div className="disclaimer-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  required
                />
                I have read and understood the above notice and agree to proceed
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Section 1: Business Type & Location */}
      <div className={`form-section ${!disclaimerAccepted ? 'disabled-section' : ''}`}>
        <fieldset>
          <legend>1. Business Type & Location</legend>
          <div className="option-group">
            <div><b>Q1. What type of business do you operate?</b></div>
            <label>
              <input
                type="radio"
                name="business-type"
                value="Brick-and-mortar store"
                checked={formData['business-type'] === 'Brick-and-mortar store'}
                onChange={onInputChange}
              />
              Brick-and-mortar store
            </label>
            <label>
              <input
                type="radio"
                name="business-type"
                value="Home-based business"
                checked={formData['business-type'] === 'Home-based business'}
                onChange={onInputChange}
              />
              Home-based business
            </label>
            <label>
              <input
                type="radio"
                name="business-type"
                value="Mobile or service-area business"
                checked={formData['business-type'] === 'Mobile or service-area business'}
                onChange={onInputChange}
              />
              Mobile or service-area business
            </label>
            <label>
              <input
                type="radio"
                name="business-type"
                value="Online-only business"
                checked={formData['business-type'] === 'Online-only business'}
                onChange={onInputChange}
              />
              Online-only business
            </label>
          </div>
          <div className="option-group">
            <div><b>Q2. Do you operate from a:</b></div>
            <label>
              <input
                type="checkbox"
                name="location-type-1"
                checked={formData['location-type-1'] || false}
                onChange={onCheckboxChange}
              />
              Private office
            </label>
            <label>
              <input
                type="checkbox"
                name="location-type-2"
                checked={formData['location-type-2'] || false}
                onChange={onCheckboxChange}
              />
              Shared workspace
            </label>
            <label>
              <input
                type="checkbox"
                name="location-type-3"
                checked={formData['location-type-3'] || false}
                onChange={onCheckboxChange}
              />
              Virtual office
            </label>
            <label>
              <input
                type="checkbox"
                name="location-type-4"
                checked={formData['location-type-4'] || false}
                onChange={onCheckboxChange}
              />
              P.O. Box or mailbox center
            </label>
            <label>
              <input
                type="checkbox"
                name="location-type-5"
                checked={formData['location-type-5'] || false}
                onChange={onCheckboxChange}
              />
              Residential address
            </label>
          </div>
        </fieldset>
      </div>


      {/* Section 2: Recent Changes */}
      <div className="form-section">
        <fieldset>
          <legend>2. Recent Changes</legend>
          <div className="option-group">
            <div><b>Q3. Have you made any changes to your GBP recently? (Select all that apply)</b></div>
            <label>
              <input
                type="checkbox"
                name="recently-changes"
                checked={formData['recently-changes'] || false}
                onChange={onCheckboxChange}
              />
              Business name
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-1"
                checked={formData['recently-changes-1'] || false}
                onChange={onCheckboxChange}
              />
              Business category
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-2"
                checked={formData['recently-changes-2'] || false}
                onChange={onCheckboxChange}
              />
              Address
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-3"
                checked={formData['recently-changes-3'] || false}
                onChange={onCheckboxChange}
              />
              Phone number
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-4"
                checked={formData['recently-changes-4'] || false}
                onChange={onCheckboxChange}
              />
              Website
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-5"
                checked={formData['recently-changes-5'] || false}
                onChange={onCheckboxChange}
              />
              Added new photos or videos
            </label>
            <label>
              <input
                type="checkbox"
                name="recently-changes-6"
                checked={formData['recently-changes-6'] || false}
                onChange={onCheckboxChange}
              />
              No changes made recently
            </label>
          </div>
        </fieldset>
      </div>

      {/* Section 3: Contact Information Details */}
      <div className="form-section">
        <fieldset>
          <legend>3. Contact Information Details</legend>
          <div className="option-group">
            <div><b>Q4. Are you using a phone number or address that's shared with another business?</b></div>
            <label>
              <input
                type="radio"
                name="shared-contact"
                value="Yes"
                checked={formData['shared-contact'] === 'Yes'}
                onChange={onInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="shared-contact"
                value="No"
                checked={formData['shared-contact'] === 'No'}
                onChange={onInputChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="shared-contact"
                value="Not sure"
                checked={formData['shared-contact'] === 'Not sure'}
                onChange={onInputChange}
              />
              Not sure
            </label>
          </div>
          <div className="option-group">
            <div><b>Q5. Is your listed phone number a mobile or landline?</b></div>
            <label>
              <input
                type="radio"
                name="phone-type"
                value="Mobile"
                checked={formData['phone-type'] === 'Mobile'}
                onChange={onInputChange}
              />
              Mobile
            </label>
            <label>
              <input
                type="radio"
                name="phone-type"
                value="Landline (business)"
                checked={formData['phone-type'] === 'Landline (business)'}
                onChange={onInputChange}
              />
              Landline (business)
            </label>
            <label>
              <input
                type="radio"
                name="phone-type"
                value="VoIP or call-forwarding service"
                checked={formData['phone-type'] === 'VoIP or call-forwarding service'}
                onChange={onInputChange}
              />
              VoIP or call-forwarding service
            </label>
            <label>
              <input
                type="radio"
                name="phone-type"
                value="Not sure"
                checked={formData['phone-type'] === 'Not sure'}
                onChange={onInputChange}
              />
              Not sure
            </label>
          </div>
        </fieldset>
      </div>

      {/* Section 4: Verification & Access */}
      <div className="form-section">
        <fieldset>
          <legend>4. Verification & Access</legend>
          <div className="option-group">
            <div><b>Q6. How was your GBP verified?</b></div>
            <label>
              <input
                type="radio"
                name="verification"
                value="Postcard"
                checked={formData['verification'] === 'Postcard'}
                onChange={onInputChange}
              />
              Postcard
            </label>
            <label>
              <input
                type="radio"
                name="verification"
                value="Phone"
                checked={formData['verification'] === 'Phone'}
                onChange={onInputChange}
              />
              Phone
            </label>
            <label>
              <input
                type="radio"
                name="verification"
                value="Video verification"
                checked={formData['verification'] === 'Video verification'}
                onChange={onInputChange}
              />
              Video verification
            </label>
            <label>
              <input
                type="radio"
                name="verification"
                value="Third-party agency"
                checked={formData['verification'] === 'Third-party agency'}
                onChange={onInputChange}
              />
              Third-party agency
            </label>
            <label>
              <input
                type="radio"
                name="verification"
                value="Dont remember"
                checked={formData['verification'] === 'Dont remember'}
                onChange={onInputChange}
              />
              Don't remember
            </label>
          </div>
          <div className="option-group">
            <div><b>Q7. Do you have access to the Google Account that manages the GBP?</b></div>
            <label>
              <input
                type="radio"
                name="account-access"
                value="Yes"
                checked={formData['account-access'] === 'Yes'}
                onChange={onInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="account-access"
                value="No"
                checked={formData['account-access'] === 'No'}
                onChange={onInputChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="account-access"
                value="Its managed by an agency or someone else"
                checked={formData['account-access'] === 'Its managed by an agency or someone else'}
                onChange={onInputChange}
              />
              It's managed by an agency or someone else
            </label>
          </div>
        </fieldset>
      </div>

      {/* Section 5: Compliance & Authenticity */}
      <div className="form-section">
        <fieldset>
          <legend>5. Compliance & Authenticity</legend>
          <div className="option-group">
            <div><b>Q8. Does your business have clear signage at the location?</b></div>
            <label>
              <input
                type="radio"
                name="signage"
                value="Yes, permanently visible signage"
                checked={formData['signage'] === 'Yes, permanently visible signage'}
                onChange={handleSignageChange}
              />
              Yes, permanently visible signage
            </label>
            <label>
              <input
                type="radio"
                name="signage"
                value="No signage yet"
                checked={formData['signage'] === 'No signage yet'}
                onChange={handleSignageChange}
              />
              No signage yet
            </label>
            <label>
              <input
                type="radio"
                name="signage"
                value="Not applicable (service-area business)"
                checked={formData['signage'] === 'Not applicable (service-area business)'}
                onChange={handleSignageChange}
              />
              Not applicable (service-area business)
            </label>
          </div>

          {/* Conditional Document Questions - Show when "Yes, permanently visible signage" is selected */}
          {showDocumentQuestions1 && (
            <div className="option-group conditional-question">
              <div><b>A. Which documents do you have from the list below?</b></div>
              <label>
                <input
                  type="checkbox"
                  name="documents-1"
                  checked={formData['documents-1'] || false}
                  onChange={onCheckboxChange}
                />
                Permanent business signage at the entrance
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-2"
                  checked={formData['documents-2'] || false}
                  onChange={onCheckboxChange}
                />
                Business card or invoice copy
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-3"
                  checked={formData['documents-3'] || false}
                  onChange={onCheckboxChange}
                />
                Business license or utility bill
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-4"
                  checked={formData['documents-4'] || false}
                  onChange={onCheckboxChange}
                />
                Area accessible to customers (e.g., hall with computer setup)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-5"
                  checked={formData['documents-5'] || false}
                  onChange={onCheckboxChange}
                />
                Area not accessible to customers (e.g., garage or private room/space)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-6"
                  checked={formData['documents-6'] || false}
                  onChange={onCheckboxChange}
                />
                Accepted payment methods (online, cash, check, software)
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-7"
                  checked={formData['documents-7'] || false}
                  onChange={onCheckboxChange}
                />
                Tools and equipment
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents-8"
                  checked={formData['documents-8'] || false}
                  onChange={onCheckboxChange}
                />
                Truck, van, or car
              </label>
            </div>
          )}

          {/* Staffed Questions - Show when "No signage yet" or "Yes, permanently visible signage" is selected */}
          {showStaffedQuestions && (
            <div className="option-group">
              <div><b>Q9. Is your business staffed and open during listed business hours?</b></div>
              <label>
                <input
                  type="radio"
                  name="staffed"
                  value="Yes"
                  checked={formData['staffed'] === 'Yes'}
                  onChange={onInputChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="staffed"
                  value="No"
                  checked={formData['staffed'] === 'No'}
                  onChange={onInputChange}
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  name="staffed"
                  value="Sometimes / on-demand"
                  checked={formData['staffed'] === 'Sometimes / on-demand'}
                  onChange={onInputChange}
                />
                Sometimes / on-demand
              </label>
            </div>
          )}

          {/* Service Area Document Questions - Show when "Not applicable (service-area business)" is selected */}
          {showDocumentQuestions2 && (
            <div className="option-group conditional-question">
              <div><b>Q9. Which documents do you have from the list below?</b></div>
              <label>
                <input
                  type="checkbox"
                  name="documents_1"
                  checked={formData['documents_1'] || false}
                  onChange={onCheckboxChange}
                />
                Business license
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents_2"
                  checked={formData['documents_2'] || false}
                  onChange={onCheckboxChange}
                />
                Business card/ Invoice Copy
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents_3"
                  checked={formData['documents_3'] || false}
                  onChange={onCheckboxChange}
                />
                Tools/Equipments
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents_4"
                  checked={formData['documents_4'] || false}
                  onChange={onCheckboxChange}
                />
                Truck/Van/Car
              </label>
              <label>
                <input
                  type="checkbox"
                  name="documents_5"
                  checked={formData['documents_5'] || false}
                  onChange={onCheckboxChange}
                />
                Utility bill
              </label>
            </div>
          )}
        </fieldset>
      </div>

      {/* Section 6: Photos, Content, and Reviews */}
      <div className="form-section">
        <fieldset>
          <legend>6. Photos, Content, and Reviews</legend>
          <div className="option-group">
            <div><b>Q10. Have you uploaded stock images, logos with text overlays, or generic promotional content?</b></div>
            <label>
              <input
                type="radio"
                name="stock-images"
                value="Yes"
                checked={formData['stock-images'] === 'Yes'}
                onChange={onInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="stock-images"
                value="No"
                checked={formData['stock-images'] === 'No'}
                onChange={onInputChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="stock-images"
                value="Not sure"
                checked={formData['stock-images'] === 'Not sure'}
                onChange={onInputChange}
              />
              Not sure
            </label>
          </div>
          <div className="option-group">
            <div><b>Q11. Have you received multiple suspicious or fake reviews recently?</b></div>
            <label>
              <input
                type="radio"
                name="fake-reviews"
                value="Yes"
                checked={formData['fake-reviews'] === 'Yes'}
                onChange={onInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="fake-reviews"
                value="No"
                checked={formData['fake-reviews'] === 'No'}
                onChange={onInputChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="fake-reviews"
                value="Not sure"
                checked={formData['fake-reviews'] === 'Not sure'}
                onChange={onInputChange}
              />
              Not sure
            </label>
          </div>
        </fieldset>
      </div>

      {/* Section 7: Google Communication */}
      <div className="form-section">
        <fieldset>
          <legend>7. Google Communication</legend>
          <div className="option-group">
            <div><b>Q12. Did you receive any emails from Google before or after suspension?</b></div>
            <label>
              <input
                type="checkbox"
                name="google-emails-1"
                checked={formData['google-emails-1'] || false}
                onChange={onCheckboxChange}
              />
              Yes, warning before suspension
            </label>
            <label>
              <input
                type="checkbox"
                name="google-emails-2"
                checked={formData['google-emails-2'] || false}
                onChange={onCheckboxChange}
              />
              Yes, notice after suspension
            </label>
            <label>
              <input
                type="checkbox"
                name="google-emails-3"
                checked={formData['google-emails-3'] || false}
                onChange={onCheckboxChange}
              />
              No emails received
            </label>
            <label>
              <input
                type="checkbox"
                name="google-emails-4"
                checked={formData['google-emails-4'] || false}
                onChange={onCheckboxChange}
              />
              Not sure
            </label>
          </div>
        </fieldset>
      </div>

      {/* Generate Report Button */}
      <div className="form-actions">
        <button
          type="button"
          className={`generate-report-btn ${!disclaimerAccepted ? 'disabled-btn' : ''}`}
          onClick={handleGenerateReport}
          disabled={!disclaimerAccepted}
        >
          📊 Generate Report
        </button>
        {!disclaimerAccepted && (
          <p style={{color: '#856404', fontSize: '14px', marginTop: '10px', textAlign: 'center'}}>
            Please accept the disclaimer to generate the report
          </p>
        )}
      </div>

      {/* Report Display */}
      {finalReport && (
        <div className="report-display-section">
          <div dangerouslySetInnerHTML={{ __html: finalReport }}></div>

          {/* Contact Information Section - After Report Generation */}
          <div className="contact-fields">
            <h3>📧 Your Contact Information</h3>
            <p>Please provide your details to receive the detailed report via email.</p>
            <ContactForm formData={formData} onInputChange={onInputChange} />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
            >
              📤 Submit Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollableForm;