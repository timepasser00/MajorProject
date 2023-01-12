// PartnersSection.js
// PartnersSection.js
import React from 'react';
import './partnerSection.css';

const PartnersSection = () => {
  return (
    <div className="partners-section">
      <h2>Our Partners</h2>
      <div className="partners-container">
        <div className="partner-card">
          <h3>Medical Shop</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
        </div>
        <div className="partner-card">
          <h3>Hospital</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
        </div>
        <div className="partner-card">
          <h3>Insurance Company</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
