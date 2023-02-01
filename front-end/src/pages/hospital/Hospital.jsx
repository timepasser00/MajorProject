import { selectClasses } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import BookAppointmentForm from '../../components/bookAppointmentForm/BookAppointmentForm';
import DoctorList from '../../components/doctorList/DoctorList';
import EnrollDoctorForm from '../../components/enrollDoctor/EnrollDoctorForm';
import './hospital.css';

const Hospital = () => {
    const {id} = useParams();
    const [selectedTab, setSelectedTab] = useState("enroll");
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    

    // const id = "63cefc0155c2fcfa7ec4bf32";

   
    

   




    
  return (
    <div className='hospital-container'>
      
      <div className='hospital-tabs'>
       <div className={`tab ${selectedTab === "list" ? "active" : ""}`} onClick={() => handleTabChange("list")}>Doctor List</div>
       <div className={`tab ${selectedTab === "enroll" ? "active" : ""}`} onClick={() => handleTabChange("enroll")}>Enroll Doctor</div>
       <div className={`tab ${selectedTab === "appointment" ? "active" : ""}`} onClick={() => handleTabChange("appointment")}>Book Appointment</div>
       </div>
       <div className='hospital-container-tab'>
   {selectedTab === "list" && <DoctorList id={id}/>}
    {selectedTab === "enroll" && <EnrollDoctorForm id={id}/>}
    {selectedTab === "appointment" && <BookAppointmentForm/>}
    </div>
    
    </div>
  )
}

export default Hospital