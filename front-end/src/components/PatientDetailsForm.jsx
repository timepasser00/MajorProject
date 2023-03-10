import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const PatientDetailsForm = (props) => {
  const walletAddress = useSelector((state) => state.walletAddress);
  console.log("walletAddress from pform :: ", walletAddress);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("walletAddress :: ", walletAddress);
    console.log("firstName :: ", firstName);
    const patientDetails = { walletAddress, firstName, lastName, age, email };
    const response = await fetch(
      "http://localhost:3001/patient/patientDetails",
      {
        method: "POST",
        body: JSON.stringify(patientDetails),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log("error");
      alert("Error submitting details");
    }
    if (response.ok) {
      // props.getDetails(walletAddress);
      setAge("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setDetailsSubmitted((prev)=>!prev);
      alert("Details submitted successfully");
     
      // props.setFlag(true);
      console.log("success");
    }
  };
  const navigate = useNavigate();
  const handleNavigation = () => {
    console.log("home");
    navigate(`/home`);
  };
  return (
    <div className="form-main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Enter your Personal Details</h1>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!detailsSubmitted && <button className="btn">Submit</button>}
        
      </form>
      {detailsSubmitted && (
          <button onClick={handleNavigation} className="btn" >
            Close
          </button>
        )}
    </div>
  );
};

export default PatientDetailsForm;
