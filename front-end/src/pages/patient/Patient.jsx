import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import './patient.css';
const Patient = () => {
    const [selectedTab , setSelectedTab] = useState("list");
    const [doctorList, setDoctorList] = useState([]);
    const [labsList, setLabsList] = useState([]);
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }
    const {id}=useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/patient/getApprovedDoctors/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            },
        })
        .then((res) => res.json())
        .then((data) => {
            setDoctorList(data);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
        fetch(`http://localhost:3001/patient/getPendingDoctors/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
           setLabsList(data);
            console.log(data);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
    
    }, [])
  return (
    <div className='patient-page-container'>
        <div className='patient-tabs'>
        <div className={`tab-${selectedTab === "list" ? "patient-active" : ""}`} onClick={() => handleTabChange("list")}>Doctor List</div>
        <div className={`tab-${selectedTab === "labs-list" ? "patient-active" : ""}`} onClick={() => handleTabChange("labs-list")}>Book Appointment</div>
        
        </div>

        <div className='patient-container-tab'>
        {selectedTab === "list" && <div className='patient-page-doctor-list'>
            <table>
                <tr>
                    <th>Doctor Name</th>
                    <th>Years of Experience</th>
                    <th>Qualification</th>
                    </tr>

                    <tbody>
                        { doctorList && doctorList.map((doctor,index) => (
                            
                            <tr key={index}>
                                <td>{doctor.firstName} {doctor.lastName}</td>

                                <td>{doctor.yearOfExperience}</td>
                                <td>{doctor.qualification}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            
            </div>}
        {/* {selectedTab === "labs-list" && <div className='patient-page-labs-list'> */}

        </div>
        
       </div>
  )
}

export default Patient