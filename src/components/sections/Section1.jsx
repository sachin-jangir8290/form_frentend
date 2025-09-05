import React from 'react';
import NavigationButtons from '../NavigationButtons';

const Section1 = ({
  currentSection,
  totalSections,
  formData,
  onInputChange,
  onCheckboxChange,
  onNextSection
}) => {
  return (
    <div className={`fieldset-container ${currentSection === 1 ? 'active' : ''}`} id="section-modal-1">
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
      <NavigationButtons
        currentSection={currentSection}
        totalSections={totalSections}
        onPrevSection={() => {}}
        onNextSection={onNextSection}
      />
    </div>
  );
};

export default Section1;