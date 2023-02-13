import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import './labTechList.css'
const LabTechList = (props) => {
  const walletAddress = useSelector((state) => state.walletAddress);
  const [labTechList, setLabTechList] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

useEffect(() => {
    fetch(`http://localhost:3001/lab/getAllLabTechs/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // const arr = Object.keys(obj).map(key => obj[key]);
        // const arrData=Object.keys(data).map((key) => data[key]);
        console.log(data, "data");
        setLabTechList(data.labTechs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLabTechSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredLabTechs = labTechList.filter((labTech) => {
      return(
        labTech.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labTech.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        labTech.qualification.toLowerCase().includes(searchTerm.toLowerCase())

      )
    });
    setFilteredList(filteredLabTechs);
  }
  const handleLabTechApproval = (id) => {
    console.log(id, "id");
    fetch(`http://localhost:3001/patient/approveLabTech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientWalletAddress: walletAddress,
        labTechId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      }
      ).catch((err) => {
        console.log(err, "error");
      }
      );


  }


  return (
    <div>LabTechList
<div>
  <input type="text" placeholder='Search' onChange={(e) => handleLabTechSearch(e.target.value)}/>
</div>
<div className='labTechList-container'>
<table>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Qualification</th>
      <th>Approval By Patient</th>
    </tr>
  </thead>
  <tbody>
    {filteredList.map((labTech) => {
      return (
        <tr>
          <td>{labTech.firstName}</td>
          <td>{labTech.lastName}</td>
          <td>{labTech.qualification}</td>
          <td>
            <button onClick={() => handleLabTechApproval(labTech._id)}>Approval by patient</button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
</div>

    </div>
  )
}

export default LabTechList