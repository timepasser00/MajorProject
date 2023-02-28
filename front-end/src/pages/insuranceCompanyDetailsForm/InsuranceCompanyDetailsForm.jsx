import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./insuranceCompanyDetailsForm.css";
const InsuranceCompanyDetailsForm = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  

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
  return (
    <div className="insuraceComapnyDetailsForm-conainer">
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default InsuranceCompanyDetailsForm;
