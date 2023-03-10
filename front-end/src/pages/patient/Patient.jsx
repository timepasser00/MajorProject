import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Prescription from "../../components/prescription/Prescription";
import "./patient.css";
import BookAppointmentForm from "../../components/bookAppointmentForm/BookAppointmentForm";
// import Home from '../home/Home'
import SearchSection from "../../components/searchSection/SearchSection";
import ReactStars from "react-rating-stars-component";
import { assignUserId } from "../../redux/actions/patientActions";


const Patient = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [doctorList, setDoctorList] = useState([]);
  const [availableDocList, setAvailableDocList] = useState([]);
  const [prescriptionCnt, setPrescriptionCnt] = useState(0);
  const [prescriptionId1, setPrescriptionId1] = useState(0);
  const [prescription, setPrescription] = useState({});
  const [doctorRating, setDoctorRating] = useState(1);
  const [modal, setModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  const [flag, setFlag] = useState(false);
  const [labsList, setLabsList] = useState([]);
  const walletAddress = useSelector((state) => state.walletAddress);
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    id && dispatch(assignUserId(id));
  }, [id]);

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

  const handleRating = (id) => {
    fetch(`http://localhost:3001/patient/doctorRatings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientWalletAddress: walletAddress,
        doctorId: id,
        star: doctorRating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const handleClick = (id) => {
    setModal(!modal);
    setDoctorId(id);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setDoctorRating(newRating);
  };

  const removeDocHandler = (id) => {
    fetch(`http://localhost:3001/patient/removeDoctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientWalletAddress: walletAddress,
        doctorId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctorList(data.doctor);
        console.log(data, "data");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  return (
    <div className="patient-page-container">
      <div className="patient-tabs">
        <div
          className={`tab-${selectedTab === "home" ? "home" : ""}`}
          onClick={() => handleTabChange("home")}
        >
          Home
        </div>
        <div
          className={`tab-${selectedTab === "list" ? "patient-active" : ""}`}
          onClick={() => handleTabChange("list")}
        >
          My Doctor's List
        </div>
        {/* <div
          className={`tab-${
            selectedTab === "lab-list" ? "patient-active" : ""
          }`}
          onClick={() => handleTabChange("list")}
        >
          My Lab's List
        </div> */}
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
          My Prescriptions
        </div>
      </div>
      {selectedTab === "home" && <SearchSection />}
      <div className="patient-container-tab">
        {selectedTab === "list" && (
          <div className="patient-page-doctor-list">
            <table>
              <tr>
                <th>Doctor Name</th>
                <th>Years of Experience</th>
                <th>Qualification</th>
                <th>Book Appointement</th>
                <th>Doctor Ratings</th>
                <th>Rate your Doctor</th>
                <th>Remove Doctor</th>
              </tr>

              <tbody>
                {doctorList &&
                  doctorList.length > 0 &&
                  doctorList.map((doctor, index) => (
                    <tr key={index}>
                      <td>
                        {doctor.firstName} {doctor.lastName}
                      </td>

                      <td>{doctor.yearOfExperience}</td>
                      <td>{doctor.qualification}</td>
                      <td>
                        {" "}
                        <button onClick={() => handleClick(doctor._id)}>
                          Book appointment
                        </button>
                      </td>
                      <td>
                        {" "}
                        <ReactStars
                          count={5}
                          value={doctor.avgRating}
                          edit={false}
                          // onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
                        />{" "}
                        ,
                      </td>
                      <td>
                        {" "}
                        <ReactStars
                          count={5}
                          value={doctorRating}
                          edit={true}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
                        />
                        {
                          <button onClick={() => handleRating(doctor._id)}>
                            Submit
                          </button>
                        }
                        ,
                      </td>
                      <td>
                        <button onClick={() => removeDocHandler(doctor._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {/* {selectedTab === "lab-list" && <ApprovedLabList />} */}
        {selectedTab === "my-prescription" && (
          <div className="my-prescription-page-tab">
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
          </div>
        )}

        {/* {selectedTab === "labs-list" && <div className='patient-page-labs-list'> */}
      </div>
      {modal && (
        <div className="modal-container-appointment">
          <div className="modal-appointment">
            <BookAppointmentForm doctorId={doctorId} />

            <button onClick={() => setModal(!modal)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
