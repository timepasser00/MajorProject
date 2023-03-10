import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import './enrollDoctorForm.css'
const EnrollDoctorForm = (props) => {
  const walletAddress=useSelector((state) =>state.walletAddress)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [hasApplied,setHasApplied] = useState(false);
    const handleSubmit= (e) => {
        e.preventDefault();
        // const doctor = {
        //     firstName,
        //     lastName,
        //     yearOfExperience,
        //     qualification
        // }
      //  fetch(`http://localhost:3001/hospital/registerDoctor/${props.id}`, {
      //         method: "POST",
      //           headers: {
      //               "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify({ firstName, lastName, yearOfExperience, qualification }),
      //       })
   fetch('http://localhost:3001/doctor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, yearOfExperience, qualification, walletAddress, hospitalId: props.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setHasApplied(true);
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      }
      );
      

    }


  return (
    <div className='doctor-enrollment-form-container'>
        <h2>Enroll Doctor Form</h2>
        <form className='doctor-enrollment-form-content' onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div>
                <label>Year Of Experience</label>
                <input type="text" value={yearOfExperience} onChange={(e) => setYearOfExperience(e.target.value)}/>
                </div>
                <div>
                <label>Qualification</label>
                <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)}/>
                </div>
                <br/>
                {!hasApplied && <button type="submit">Apply</button>}
                {/* {hasApplied && <button >Close</button>} */}


   </form>
    </div>
  )
}

export default EnrollDoctorForm