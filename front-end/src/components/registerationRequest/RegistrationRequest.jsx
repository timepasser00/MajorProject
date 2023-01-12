import React from "react";
import { useState } from "react";
const RegistrationRequest = () => {
  const [type, setType] = useState("hospital");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Registration Request Submitted");
    const res = await fetch("http://localhost:3001/hospital/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, name, contact }),
    });
    const data = await res.json();

    if (res.status !== 200 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");
    }
  };
  return (
    <div>
      <h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="type">Type:</label>
            <select name="" id="type"
            value={type}
            onChange={(e) =>setType(e.target.value)}>
                <option value="hospital">Hospital</option>
                <option value="lab">Lab</option>
            </select>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) =>setName(e.target.value)}/>
            <label htmlFor="contact">Contact:</label>
            <input type="text" id="contact" name="contact" value={contact} onChange={(e) =>setContact(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      </h3>
    </div>
  );
};

export default RegistrationRequest;
