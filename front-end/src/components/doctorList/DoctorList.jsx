import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BookAppointmentForm from "../bookAppointmentForm/BookAppointmentForm";

// import StarRatings from './react-star-ratings';
import ReactStars from "react-rating-stars-component";

import "./doctorList.css";
import { useSelector } from "react-redux";

const DoctorList = (props) => {
  const userType = useSelector((state) => state.category);
  const currUserId = useSelector((state) => state.userId);
  const walletAddress = useSelector((state) => state.walletAddress);
  const [doctor, setDoctor] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(10);
  const [hospitalId, setHospitalId] = useState("");
  const [modal, setModal] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [doctorRating, setDoctorRating] = useState(1);
  const [approvedCount, setApprovedCount] = useState(0);
  const [requiredRating, setRequiredRating] = useState(0);
  const [approved, setApproved] = useState(false);

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
        let doctor = data.doctors;
        setDoctor(doctor);
        setFilteredDoctors(doctor);
        const newDoctorList = [];

        const promises = doctor.map((d) => isDoctorApproved(d._id));
        Promise.all(promises).then((approvalList) => {
          const newDoctorList = doctor.map((d, i) => ({
            ...d,
            isApproved: approvalList[i],
          }));
          // update state with newDoctorList
          // console.log(newDoctorList, "new doctor list");
          setDoctor(newDoctorList);
        });
        //  setDoctor(newDoctorList);
        //  console.log(newDoctorList,"new doc list")

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
        setApprovedCount(approvedCount + 1);
        // doctor = doctor.filter((d)=>d._id !== id)
        console.log(data, "data");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setDoctorRating(newRating);
  };
  const getRating = (id) => {
    fetch(`http://localhost:3001/patient/getDoctorRatings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const isDoctorApproved = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/patient/isDoctorApproved/${id}/${walletAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data, "data");
      return data.isApproved;
    } catch (err) {
      console.log(err, "error");
      return false;
    }
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

  const handleSearchByRating = () => {
    // setRequiredRating(e.target.value);
    let docFilteredByRating = doctor.filter(
      (f) => f.avgRating >= requiredRating
    );
    setFilteredDoctors(docFilteredByRating);
  };

  return (
    <div>
      <div>
        <label>Doctor Name : </label>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleDoctorSearch(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearchByRating(e.target.value)}
        /> */}
        <div>
          <label>Rating : </label>
          <select onChange={(e) => setRequiredRating(e.target.value)}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={handleSearchByRating}>Submit</button>
        </div>
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
              <th>Doctor Ratings</th>
              {/* {userType === 'patient' && <th>Rate your Doctor</th>} */}
            </tr>
          </thead>
          <tbody>
            {filteredDoctors &&
              filteredDoctors.map((doctor) => (
                <>
                  {console.log(doctor)}
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
                    <td>
                      {doctor.approvedBy.includes(currUserId) ? (
                        <span>Approved </span>
                      ) : (
                        <button
                          onClick={() => handleDoctorApproval(doctor._id)}
                        >
                          Approve
                        </button>
                      )}
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
                    {/* {doctor.isApproved && (
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
                      <button onClick={() => handleRating(doctor._id)}>
                        submit
                      </button>
                      ,
                    </td>
                  )} */}
                    {/* <td>{doctor.specialization}</td> */}
                  </tr>
                </>
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
