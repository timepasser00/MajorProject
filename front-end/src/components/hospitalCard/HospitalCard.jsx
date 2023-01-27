import React from "react";
import "./hospitalCard.css";
const HospitalCard = ({ hospitalData }) => {
  return (
    <div>
      <div className="hospital-card">
        <h2>{hospitalData.name}</h2>
        <div>
          Address:
          <p>City: {hospitalData.address.city}</p>
          <p>State: {hospitalData.address.state}</p>
          <p>Pincode: {hospitalData.address.pincode}</p>
          <div>
            <p>Contact: {hospitalData.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
