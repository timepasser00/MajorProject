import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./insuranceCompanyDetailsForm.css";
const InsuranceCompanyDetailsForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitted , setIsSubmitted] = useState(false);

  const walletAddress= useSelector((state) => state.walletAddress);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/insuranceCompany/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, contact, walletAddress }),
    })
      .then((res) => 
      
      {
        // console.log(res);
        if(res.status === 200){
          setIsSubmitted(true);
          return  res.json()
        }
        else{
          window.alert("Invalid Registration");
          console.log("Invalid Registration");
        }
      
      }
      
        
      )
      .then((data) => {
      if(data){
        window.alert("registerd successfully");
      }
       
      });
  };

  const navigate = useNavigate();

  const navigateHome = ()=>{
    navigate("/home");
  }
  return (
    <div className="insuraceComapnyDetailsForm-conainer">
      <h2>Details Form</h2>
      <form className="insuraceComapnyDetailsForm" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
       { !isSubmitted && <button>Submit</button>}
       { isSubmitted && <button onClick={navigateHome}>Close</button>}
      </form>
    </div>
  );
};

export default InsuranceCompanyDetailsForm;
