import React from 'react';

const ReportDisplay = ({ reportHtml, onSubmit }) => {
  return (
    <div className="submit-section">
      <h3>Review and Submit</h3>
      <p>Please review your report below and click submit to receive it via email.</p>
      <div id="final-report-modal" dangerouslySetInnerHTML={{ __html: reportHtml }}></div>
      <button type="submit" className="submit-btn" onClick={onSubmit}>
        Submit Report
      </button>
    </div>
  );
};

export default ReportDisplay;