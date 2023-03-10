import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./labTech.css";
const LabTech = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const walletAddress = useSelector((state) => state.walletAddress);
  const handleNavigation = (pId) => {
    console.log("handleNavigation");
    navigate("/labTech/genrateReport", {
      state: { pId: pId, labTechWalletAddress: walletAddress },
    });
    console.log(pId, "Pid");
  };

  const handleReportPage = (pId) => {
    console.log("handleReportPage");
    navigate("/labTech/report", {
      state: { pId: pId, labTechWalletAddress: walletAddress },
    });
    console.log(pId, "Pid");
  };
  useEffect(() => {
    const handleRequest = async () => {
      // e.preventDefault();
      fetch(`http://localhost:3001/labTech/getAllPatients/${walletAddress}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            alert(" error here");
          }
        })
        .then((data) => {
          setPatient(data.patients);
          console.log(data, "data");
        });
      console.log("LabTech");
    };
    handleRequest();
  }, []);
  const handleRequest = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/labTech/getAllPatients/${walletAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert(" error here");
        }
      })
      .then((data) => {
        setPatient(data.patients);
        console.log(data, "data");
      });
    console.log("LabTech");
  };

  return (
    <div className="labTech-page-container">
      LabTech
      <h3>Patients List</h3>
      {/* <button onClick={handleRequest}>My Patients</button> */}
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Create Report</th>
          </tr>
        </thead>
        <tbody>
          {patient &&
            patient.map((patient) => (
              <tr>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>
                <td>{patient.age}</td>
                <td>
                  <button onClick={() => handleNavigation(patient._id)}>
                    Create Report
                  </button>
                </td>
                {/* <td><button onClick={() =>handleReportPage(patient._id)}   >Get Lab report</button></td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTech;
