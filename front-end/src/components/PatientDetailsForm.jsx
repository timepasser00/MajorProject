import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const PatientDetailsForm = () => {
  const walletAddress = useSelector((state) => state.walletAddress);
  console.log("walletAddress from pform :: ", walletAddress);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
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
    }
    if (response.ok) {
      // props.getDetails(walletAddress);
      setAge("");
      setFirstName("");
      setLastName("");
      setEmail("");
      // props.setFlag(true);
      console.log("success");
    }
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
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PatientDetailsForm;
