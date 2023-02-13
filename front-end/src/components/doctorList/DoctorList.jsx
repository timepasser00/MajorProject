import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookAppointmentForm from "../bookAppointmentForm/BookAppointmentForm";
import { useSelector } from "react-redux";
import "./doctorList.css";

const DoctorList = (props) => {
  const walletAddress = useSelector((state) => state.walletAddress);
  const [doctor, setDoctor] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(10);
  const [hospitalId, setHospitalId] = useState("");
  const [modal, setModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/hospital/getAllDoctors/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // const arr = Object.keys(obj).map(key => obj[key]);
        // const arrData=Object.keys(data).map((key) => data[key]);

        // console.log(arrData, "arrdata");
        // // console.log(data, "data");
        // console.log(arrData, "hospitalId");
        const doctor = data.doctors;
        setDoctor(doctor);
        console.log(doctor, "doctor");
      });
      console.log(walletAddress, "walletAddress");
  }, []);
  const handleDoctorSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredDoctors = doctor.filter((doctor) => {
      return (
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredDoctors(filteredDoctors);
  };
  const handleClick = (id) => {
    setModal(!modal);
    setDoctorId(id);
  };
  const handleDoctorApproval = (id) => {
    fetch(`http://localhost:3001/patient/approveDoctor`, {
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
        console.log(data, "data");
      }
      ).catch((err) => {
        console.log(err, "error");
      }
      );
        

    
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleDoctorSearch(e.target.value)}
        />
      </div>

      <div className="doctor-list">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Book Appointement</th>
              <th>Approve Doctor </th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors &&
              filteredDoctors.map((doctor) => (
                <tr>
                  <td>{doctor.firstName}</td>
                  <td>{doctor.lastName}</td>
                  <td>{doctor.qualification}</td>

                  <td>{doctor.yearOfExperience}</td>
                  {/* <td><button onClick={() => setModal(!modal), setDoctorId(doctor.id)} >Book Appointment</button></td> */}
                  <td>
                    {" "}
                    <button onClick={() => handleClick(doctor._id)}>
                      Book appointment
                    </button>
                  </td>
                    <td> <button onClick={() => handleDoctorApproval(doctor._id)}> approve  </button></td>
                  {/* <td>{doctor.specialization}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
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

export default DoctorList;
