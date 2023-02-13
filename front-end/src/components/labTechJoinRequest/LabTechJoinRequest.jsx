import React from 'react'
import {useState} from 'react'
const LabTechJoinRequest = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [yearOfExperience, setYearOfExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const walletAddress = props.walletAddress;
    const handleSubmit= (e) => {
      e.preventDefault();
      fetch('http://localhost:3001/labTech/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: firstName,
              
            lastName: lastName,
            yearOfExperience: yearOfExperience,
            qualification: qualification,
            walletAddress: walletAddress,
            employeeType: "labTech",
          
            labId: props.id
            })
          })
          .then(res => res.json())
          .then(data => {

            console.log(data);
          }
          )
          .catch(err => console.log(err))

    
    }
    


  return (
    <div>
    <h1>Lab-tech Join Request</h1>
    <form onSubmit={handleSubmit}>
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
            <button type="submit">Enroll</button>


</form>
</div>
  )
}

export default LabTechJoinRequest