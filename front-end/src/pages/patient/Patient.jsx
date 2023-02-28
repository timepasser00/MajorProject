import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Prescription from "../../components/prescription/Prescription";
import "./patient.css";
const Patient = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [doctorList, setDoctorList] = useState([]);
  const [availableDocList, setAvailableDocList] = useState([]);
  const [prescriptionCnt, setPrescriptionCnt] = useState(0);
  const [prescriptionId1, setPrescriptionId1] = useState(0);
  const [prescription, setPrescription] = useState({});

  const [flag, setFlag] = useState(false);
  const [labsList, setLabsList] = useState([]);
  const walletAddress = useSelector((state) => state.walletAddress);
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const { id } = useParams();

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
      });
    // fetch(`http://localhost:3001/patient/getPendingDoctors/${id}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //    setLabsList(data);
    //     console.log(data);
    // }
    // )
    // .catch((err) => {
    //     console.log(err);
    // }
    // )
  }, [id]);

  const getPrescriptionId = async (patientId) => {
    fetch(`http://localhost:3001/doctor/getPrescriptionCnt/${id}`, {
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
      `http://localhost:3001/doctor/getPrescription/${id}/${prescriptionId1}/${walletAddress}`,
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
    <div className="patient-page-container">
      <div className="patient-tabs">
        <div
          className={`tab-${selectedTab === "list" ? "patient-active" : ""}`}
          onClick={() => handleTabChange("list")}
        >
          Doctor List
        </div>
        {/* <div
          className={`tab-${
            selectedTab === "labs-list" ? "patient-active" : ""
          }`}
          onClick={() => handleTabChange("labs-list")}
        >
          Book Appointment
        </div> */}
        <div
          className={`tab-${
            selectedTab === "my-prescription" ? "patient-active" : ""
          }`}
          onClick={() => handleTabChange("my-prescription")}
        >
         My Prscription
        </div>
      </div>

      <div className="patient-container-tab">
        {selectedTab === "list" && (
          <div className="patient-page-doctor-list">
            <table>
              <tr>
                <th>Doctor Name</th>
                <th>Years of Experience</th>
                <th>Qualification</th>
              </tr>

              <tbody>
                {doctorList &&
                  doctorList.map((doctor, index) => (
                    <tr key={index}>
                      <td>
                        {doctor.firstName} {doctor.lastName}
                      </td>

                      <td>{doctor.yearOfExperience}</td>
                      <td>{doctor.qualification}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
 {selectedTab === "my-prescription" && <div className='my-prescription-page-tab' >
                
        <div className="my-prescription-page-tab-nav">
          <button onClick={() => getPrescriptionId(id)}>
            View Past Prescription{" "}
          </button>
          <form onSubmit={(e) => fetchPrescription(e, id)}>
            <select onChange={(e) => setPrescriptionId1(e.target.value)}>
              <option value="0">Select</option>
              {Array.from({ length: prescriptionCnt }, (_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
            {<button type="submit">Submit</button>}
          </form>
          </div>
          {flag && (
            <>
              <Prescription
                symptoms={prescription.prescription.symptoms}
                tests={prescription.labReport}
                medications={Object.keys(
                  prescription.prescription.medications
                ).map((key) => prescription.prescription.medications[key])}
                doctor={prescription.prescription.doctor}
                patient={prescription.prescription.patient}
                view={true}
              />
            </>
          )}
        
        </div>}

        {/* {selectedTab === "labs-list" && <div className='patient-page-labs-list'> */}
      </div>
    </div>
  );
};

export default Patient;
