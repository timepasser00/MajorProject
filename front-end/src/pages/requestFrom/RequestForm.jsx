import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import './requestForm.css';

const RequestForm = () => {
    const tempwallet=useSelector((state)=>state.walletAddress)





   


    console.log(tempwallet,"tempwalletFromRequestForm");
  const [formData, setFormData] = useState({
    type: 'hospital',
    name: '',
    contact: '',
    address: {
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    specialities: [],
    walletAddress: ""

  });

  useEffect (()=>{
   
  
    console.log(tempwallet,"tempwalletFromRequestForm");
        formData.walletAddress=tempwallet
        
          

}
,[formData,tempwallet])

//   const handleChange = (event) => {
    
//   };

//   const handleAddressChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       address: {
//         ...prevState.address,
//         [name]: value
//       }
//     }));
//   };

//   const handleSpecialitiesChange = (event) => {
//     const { value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       specialities: value
//     }));
//   };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // send formData to the server or handle form submission here
  };

  const handleRequest = async() => {
    console.log(formData,"formData");
    const url = 'http://localhost:3001/hospital/register';
    // console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {  
        'Content-Type': 'application/json'
        // 'Content-Type': "multipart/form-data"
      }
    })

    if(response.status === 200){
        const msg = await response.text();
        console.log(msg);
        alert(msg);
    }
    // if(func === "signUp"){
    //   const msg = await response.text();
    //   console.log(msg);
    //   alert(msg); 
    // }else{
    //   const msg = await response.text();
    //   console.log(msg);
    //   alert(msg); 
    // }
         
  };

  return (
    <div className='request-form-container'> 
    <form onSubmit={handleRequest}>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={(event) => setFormData({ ...formData, type: event.target.value,walletAddress:tempwallet })}
        />
      </label>
      {/* <br /> */}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        />
      </label>
      {/* <br /> */}
      <label>
        Contact:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={(event) => setFormData({ ...formData, contact: event.target.value })}
        />
      </label>
      {/* <br /> */}
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.address.city}
          onChange={(event) => setFormData({ ...formData, address: { ...formData.address, city: event.target.value } })}
        />
      </label>
      {/* <br /> */}
      <label>
        State:
        <input
          type="text"
          name="state"
          value={formData.address.state}
          onChange={(event) => setFormData({ ...formData, address: { ...formData.address, state: event.target.value } })}
        />
      </label>
      {/* <br /> */}
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.address.country}
          onChange={(event) => setFormData({ ...formData, address: { ...formData.address, country: event.target.value } })}
        />
      </label>
      {/* <br /> */}
      <label>
        Pincode:
        <input
          type="text"
          name="pincode"
          value={formData.address.pincode}
          onChange={(event) => setFormData({ ...formData, address: { ...formData.address, pincode: event.target.value } })}
        />
      </label>
      {/* <br /> */}
      <label>
        Specialities:
        <select
          
          value={formData.specialities}
          onChange={(event)=> setFormData({ ...formData, specialities: event.target.value })}
        >
          <option value="ortho">Orthopedics</option>
          <option value="neuro">Neurology</option>
          <option value="cardio">Cardiology</option>
          <option value="onco">Oncology</option>
          <option value="pedia">Pediatrics</option>
        </select>
      </label>
      {/* <br /> */}
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
};

export default RequestForm;
