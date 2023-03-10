import React  , {useState} from 'react'
import './userGuide.css'
import PatientUserGuide from '../../components/userGuideBodyContent/PatientUserGuide';
import HospitalUserGuide from '../../components/userGuideBodyContent/HospitalUserGuide';
import LabUserGuide from '../../components/userGuideBodyContent/LabUserGuide';
import DoctorUserGuide from '../../components/userGuideBodyContent/DoctorUserGuide';
import InsuranceUserGuide from '../../components/userGuideBodyContent/InsuranceUserGuide';


const UserGuide = () => {
    const [userCategory , SetUserCategory] = useState("patient");
  return (
    <div className="user-guide-container">
        <div className="user-guide-header">
            User Guide
        </div>
        <div className="user-category-section">
            <label htmlFor="user-category"> User : </label>
            <select name="user-category"
            onChange={(e)=>{
                SetUserCategory(e.target.value)
            }}
            >
                <option value="patient"> Patient</option>
                <option value="hospital">Hospital</option>
                <option value="lab">Lab</option>
                <option value="doctor">Doctor</option>
                {/* <option value="insurance">Insurance Company</option> */}

            </select>
        </div>
        <div className="user-guide-body">
            {userCategory === "patient" && <PatientUserGuide/>}
            {userCategory === "hospital" && <HospitalUserGuide/>}
            {userCategory === "lab" && <LabUserGuide/>}
            {userCategory === "doctor" && <DoctorUserGuide/>}
            {/* {userCategory === "insurance" && <InsuranceUserGuide/>} */}
        </div>
    </div>
  )
}

export default UserGuide