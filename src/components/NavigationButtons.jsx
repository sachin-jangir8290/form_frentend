import React from 'react';

const NavigationButtons = ({
  currentSection,
  totalSections,
  onPrevSection,
  onNextSection,
  onGenerateReport,
  showGenerateReport = false
}) => {
  return (
    <div className="navigation-buttons">
      <button
        type="button"
        className="nav-btn"
        onClick={onPrevSection}
        disabled={currentSection === 1}
      >
        Previous
      </button>

      {showGenerateReport ? (
        <button
          type="button"
          className="nav-btn generate-btn"
          onClick={onGenerateReport}
        >
          Generate Report
        </button>
      ) : (
        <button
          type="button"
          className="nav-btn"
          onClick={onNextSection}
          disabled={currentSection === totalSections}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;