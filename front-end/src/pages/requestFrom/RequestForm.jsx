import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';

import "./requestForm.css";

const RequestForm = () => {
  const location = useLocation();
  const selectedOption = location.state.data;
  const tempwallet = useSelector((state) => state.walletAddress);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log(tempwallet, "tempwalletFromRequestForm");
  console.log(selectedOption, "selectedOptionFromRequestForm");
  const [formData, setFormData] = useState({
    type: `${selectedOption}`,
    name: "",
    contact: "",
    address: {
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    specialities: [],
    walletAddress: "",
  });

  useEffect(() => {
    console.log(tempwallet, "tempwalletFromRequestForm");
    formData.walletAddress = tempwallet;
  }, [formData, tempwallet]);

 
  const handleRequest = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    const url = "http://localhost:3001/hospital/register";
    // console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': "multipart/form-data"
      },
    });

    if (response.status === 200) {
      const msg = await response.text();
      console.log(msg);
      setIsSubmitted(true);
      alert(msg);
    }
  };

  return (
    <div className="request-form-container">
      <h2>Request Form Details </h2>
      <form className="request-form-form" onSubmit={handleRequest}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
        </div>
        {/* <br /> */}
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={(event) =>
              setFormData({ ...formData, contact: event.target.value })
            }
          />
        </div>
        {/* <br /> */}
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={(event) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: event.target.value },
              })
            }
          />
        </div>
        {/* <br /> */}
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={(event) =>
              setFormData({
                ...formData,
                address: { ...formData.address, state: event.target.value },
              })
            }
          />
        </div>
        {/* <br /> */}
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={(event) =>
              setFormData({
                ...formData,
                address: { ...formData.address, country: event.target.value },
              })
            }
          />
        </div>
        {/* <br /> */}
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.address.pincode}
            onChange={(event) =>
              setFormData({
                ...formData,
                address: { ...formData.address, pincode: event.target.value },
              })
            }
          />
        </div>
        {/* <br /> */}
        {selectedOption === "hospital" && (
          <div>
            <label>Specialities:</label>
            <select
              value={formData.specialities}
              onChange={(event) =>
                setFormData({ ...formData, specialities: event.target.value })
              }
            >
              <option value="ortho">Orthopedics</option>
              <option value="neuro">Neurology</option>
              <option value="cardio">Cardiology</option>
              <option value="onco">Oncology</option>
              <option value="pedia">Pediatrics</option>
            </select>
          </div>
        )}

        {selectedOption === "lab" && (
          <div>
            <label>Specialities:</label>
            <select
              value={formData.specialities}
              onChange={(event) =>
                setFormData({ ...formData, specialities: event.target.value })
              }
            >
              <option value="diabities">Sugar </option>
              <option value="bloodTest">Blood Test</option>
              <option value="cancer">Cancer Test</option>
            </select>
          </div>
        )}
        {/* <br /> */}

        {!isSubmitted && <input type="submit" value="Submit" />}
        {isSubmitted && <button >{<Link to="/home">Home</Link>}</button>}
      </form>
    </div>
  );
};

export default RequestForm;
