import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Prescription from "../../components/prescription/Prescription";
import "./insuranceCompany.css";

const InsuranceCompany = () => {
  const [prescriptionCnt, setPrescriptionCnt] = useState(0);
  const [prescriptionId1, setPrescriptionId1] = useState(0);
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  const [patient, setPatient] = useState([]);
  const [prescription, setPrescription] = useState({});
  const walletAddress = useSelector((state) => state.walletAddress);
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:3001/insuranceCompany/getAllPatients/${id}`, {
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
        console.log(data, "data");
        setPatient(data.patient);
        // setInsuranceCompanyList(data.insuranceCompany);
      });
  }, []);

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

  return (
    <div className="insuranceCompany-page-container">
      <h2>Insurance Company</h2>

      {/* <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
               
                <th>Check Claim</th>
                </tr>
                {patients && patients.map((patient) => (
                    <tr>
                        <td>{patient.firstName} {patient.lastName}</td>
                        <td>{patient.age}</td>
                        
                        <td><button onClick={fetchPresciption}>Check Claim</button></td>
                    </tr>
                ))}
        </table> */}

      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Create Prescription</th>
            <th>View Past Prescription</th>
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
                <button onClick={() => getPrescriptionId(patient._id)}>
                  View Past Prescription{" "}
                </button>
              </td>
              <td>
                <form onSubmit={(e) => fetchPrescription(e, patient._id)}>
                  <select onChange={(e) => setPrescriptionId1(e.target.value)}>
                    <option value="0">Select</option>
                    {Array.from({ length: prescriptionCnt }, (_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  {<button type="submit">Submit</button>}
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
export default InsuranceCompany;
