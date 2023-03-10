// PartnersSection.js
// PartnersSection.js
import React from "react";
import "./partnerSection.css";

const PartnersSection = () => {
  return (
    <div className="partners-section">
      <h2>Our Partners</h2>
      <div className="partners-container">
        <div className="partner-card">
          <h3>Lab</h3>
          <p>
            Our Lab partners provide reliable and affordable Lab Tests. Just one click and you can have your lab tests done. 
          </p>
        </div>
        <div className="partner-card">
          <h3>Hospital</h3>
          <p>
            Our Hospital partners forms a huge chain of hospitals, whom you can trust. You can select hospital based on the based doctor, city or speciality.
          </p>
        </div>
        <div className="partner-card">
          <h3>Insurance Company</h3>
          <p>
            Our Insurance partners provide a hassle free health claims. They trust the health records, they get from our platform, hence speed tracking your health claims.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
