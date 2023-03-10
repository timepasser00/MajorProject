import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Prescription from "../../components/prescription/Prescription";
import "./doctor.css";

const Doctor = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const walletAddress = useSelector((state) => state.walletAddress);
  const [prescriptionCnt, setPrescriptionCnt] = useState(0);
  const [prescriptionId1, setPrescriptionId1] = useState(0);
  const [prescriptionVisibility, setPrescriptionVisibility] = useState(false);
  const [prescription, setPrescription] = useState({});
  const [flag, setFlag] = useState(false);
  const [pastPrescriptionVisibility, setPastPrescriptionVisibility] =
    useState(false);
  const [patientRecordVisiblility, setPatientRecordVisibility] =
    useState(false);
  const handleNavigation = (pId) => {
    console.log("handleNavigation");
    console.log(pId, "Pid");
    navigate("/doctor/prescription", {
      state: { pId: pId, docWalletAddress: walletAddress },
    });
  };
  const getPrescriptionId = async (patientId) => {
    fetch(`http://localhost:3001/doctor/getPrescriptionCnt/${patientId}`, {
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
        setPrescriptionCnt(() => data.prescriptionCnt);
        setPastPrescriptionVisibility(true);
        console.log(data, "data");
        console.log(prescriptionCnt, "prescriptionCnt");
      });
    // console.log("Doctor");
  };

  const fetchPrescription = async (e, patientId) => {
    e.preventDefault();
    console.log(prescriptionId1, "e.target.value", patientId);
    fetch(
      `http://localhost:3001/doctor/getPrescription/${patientId}/${prescriptionId1}/${walletAddress}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert(" error here");
        }
      })
      .then((data) => {
        setFlag(true);
        console.log(data, "data");
        console.log(data.prescription, "data.prescription");
        console.log(
          data.prescription.symptoms,
          "data.prescription.prescriptionId"
        );
        console.log(data.labReport, "data.prescription.prescriptionId");
        setPrescription(data);
      });
  };
  // useEffect(() => {
  //     console.log(prescriptionId1, "prescriptionId1");
  // }, [prescriptionCnt])

  useEffect(() => {
    const handleRequest = async () => {
      // e.preventDefault();
      fetch(`http://localhost:3001/doctor/getAllPatients/${walletAddress}`, {
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
          setPatient(data.patient);
          setPatientRecordVisibility(true);
          console.log(data, "data");
        });
      console.log("Doctor");
    };
    handleRequest();
  }, []);
  const handleRequest = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/doctor/getAllPatients/${walletAddress}`, {
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
        setPatient(data.patient);
        setPatientRecordVisibility(true);
        console.log(data, "data");
      });
    console.log("Doctor");
  };
  return (
    <div className="doctor-page-container">
      <h2>Doctor</h2>
      <h3>Patients List</h3>
      {/* <button onClick={handleRequest}>My Paients</button> */}
      {patientRecordVisiblility && (
        <table className="my-patient-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Create Prescription</th>
              <th>Past Prescription</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((patient) => (
              <tr>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>
                <td>{patient.age}</td>
                <td>
                  <button onClick={() => handleNavigation(patient._id)}>
                    Create Prescription
                  </button>
                </td>
                <td>
                  {!pastPrescriptionVisibility && (
                    <button onClick={() => getPrescriptionId(patient._id)}>
                      Get Past Prescription{" "}
                    </button>
                  )}
                  {pastPrescriptionVisibility && (
                    <form onSubmit={(e) => fetchPrescription(e, patient._id)}>
                      <select
                        onChange={(e) => setPrescriptionId1(e.target.value)}
                      >
                        <option value="0">Select</option>
                        {Array.from({ length: prescriptionCnt }, (_, i) => (
                          <option value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      {<button type="submit">Submit</button>}
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {flag && (
        <>
          <Prescription
            symptoms={prescription.prescription.symptoms}
            tests={prescription.labReport}
            medications={Object.keys(prescription.prescription.medications).map(
              (key) => prescription.prescription.medications[key]
            )}
            doctor={prescription.prescription.doctor}
            patient={prescription.prescription.patient}
            view={true}
          />
        </>
      )}
    </div>
  );
};

export default Doctor;
