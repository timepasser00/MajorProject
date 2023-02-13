import { selectClasses } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import BookAppointmentForm from '../../components/bookAppointmentForm/BookAppointmentForm';
import DoctorList from '../../components/doctorList/DoctorList';
import EmployeeApprove from '../../components/employeeApprove/EmployeeApprove';
import EnrollDoctorForm from '../../components/enrollDoctor/EnrollDoctorForm';
import './hospital.css';

const Hospital = () => {
  const [userType, setUserType] = useState("");
    const {id} = useParams();
    const [selectedTab, setSelectedTab] = useState("enroll");
// const [walletAddress, setWalletAddress] = useState("");
const walletAddress = useSelector(state => state.walletAddress);
    useEffect(() => {
// setWalletAddress(tempwalletAddress);
// console.log(walletAddress);

fetch(`http://localhost:3001/home/findUserType`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            walletAddress: walletAddress,
        }),
    })
    .then((res) =>
    {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 404){
            alert(" error here1")
        }
    })
    .then((data) => {
        console.log(data, "data");
        setUserType(data.category);
        // setInsuranceCompanyList(data.insuranceCompany);
    });


    }, [])
   
    
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    

    // const id = "63cefc0155c2fcfa7ec4bf32";

   
    

   




    
  return (
    <div className='hospital-container'>
      
      <div className='hospital-tabs'>
       <div className={`tab ${selectedTab === "list" ? "active" : ""}`} onClick={() => handleTabChange("list")}>Doctor List</div>
       <div className={`tab ${selectedTab === "enroll" ? "active" : ""}`} onClick={() => handleTabChange("enroll")}>Enroll Doctor</div>
       {/* <div className={`tab ${selectedTab === "appointment" ? "active" : ""}`} onClick={() => handleTabChange("appointment")}>Book Appointment</div> */}
      {userType==="hospital" && <div className={`tab ${selectedTab === "approve" ? "active" : ""}`} onClick={() => handleTabChange("approve")}>Approve Doctor</div>}
       </div>
       <div className='hospital-container-tab'>
   {selectedTab === "list" && <DoctorList id={id}/>}
    {selectedTab === "enroll" && <EnrollDoctorForm id={id}/>}
    {/* {selectedTab === "appointment" && <BookAppointmentForm/>} */}
    {userType==="hospital" && selectedTab === "approve" && <EmployeeApprove type={'hospital'} hospitalId={id} empWalletAddress={walletAddress}/>}
    </div>
    
    </div>
  )
}

export default Hospital