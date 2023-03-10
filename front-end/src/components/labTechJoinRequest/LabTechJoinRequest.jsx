import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./labTechJoinRequest.css";
const LabTechJoinRequest = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearOfExperience, setYearOfExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const walletAddress = props.walletAddress;
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/labTech/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,

        lastName: lastName,
        yearOfExperience: yearOfExperience,
        qualification: qualification,
        walletAddress: walletAddress,
        employeeType: "labTech",

        labId: props.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitted(true);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const navigateHome = ()=>{
    navigate("/home");
  }

  return (
    <div className="lab-tech-join-request-container">
      <h2>Lab-tech Join Request</h2>
      <form className="lab-tech-join-request-form" onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Year Of Experience</label>
          <input
            type="text"
            value={yearOfExperience}
            onChange={(e) => setYearOfExperience(e.target.value)}
          />
        </div>
        <div>
          <label>Qualification</label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>
       {!isSubmitted &&  <button type="submit">Enroll</button>}
      </form>
      {isSubmitted &&  <button onClick={navigateHome}>Close</button>}
    </div>
  );
};

export default LabTechJoinRequest;
