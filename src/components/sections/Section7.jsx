import React from 'react';
import NavigationButtons from '../NavigationButtons';

const Section7 = ({
  currentSection,
  totalSections,
  formData,
  onInputChange,
  onPrevSection,
  onGenerateReport
}) => {
  return (
    <div className={`fieldset-container ${currentSection === 7 ? 'active' : ''}`} id="section-modal-7">
      <fieldset>
        <legend>7. Google Communication</legend>
        <div className="option-group">
          <div><b>Q12. Did you receive any emails from Google before or after suspension?</b></div>
          <label>
            <input
              type="checkbox"
              name="google-emails-1"
              checked={formData['google-emails-1'] || false}
              onChange={(e) => onInputChange({
                target: {
                  name: 'google-emails-1',
                  value: e.target.checked ? 'Yes, warning before suspension' : ''
                }
              })}
            />
            Yes, warning before suspension
          </label>
          <label>
            <input
              type="checkbox"
              name="google-emails-2"
              checked={formData['google-emails-2'] || false}
              onChange={(e) => onInputChange({
                target: {
                  name: 'google-emails-2',
                  value: e.target.checked ? 'Yes, notice after suspension' : ''
                }
              })}
            />
            Yes, notice after suspension
          </label>
          <label>
            <input
              type="checkbox"
              name="google-emails-3"
              checked={formData['google-emails-3'] || false}
              onChange={(e) => onInputChange({
                target: {
                  name: 'google-emails-3',
                  value: e.target.checked ? 'No emails received' : ''
                }
              })}
            />
            No emails received
          </label>
          <label>
            <input
              type="checkbox"
              name="google-emails-4"
              checked={formData['google-emails-4'] || false}
              onChange={(e) => onInputChange({
                target: {
                  name: 'google-emails-4',
                  value: e.target.checked ? 'Not sure' : ''
                }
              })}
            />
            Not sure
          </label>
        </div>
      </fieldset>

      <NavigationButtons
        currentSection={currentSection}
        totalSections={totalSections}
        onPrevSection={onPrevSection}
        onNextSection={() => {}}
        onGenerateReport={onGenerateReport}
        showGenerateReport={true}
      />
    </div>
  );
};

export default Section7;