import React from "react";
import { useState } from "react";
import HospitalCard from "../../components/hospitalCard/HospitalCard";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
    const navigate = useNavigate();
  const [searchType, setSearchType] = useState("hospital");
  const [searchText, setSearchText] = useState("");
  const [hospitalList, setHospitalList] = useState([]);
  const handleNavigation = (id) => {
    console.log(id, "id");
    navigate(`/hospital/${id}`);
  };
  const handleSearch = () => {
    console.log(searchType, searchText);
    fetch("http://localhost:3001/patient/searchHospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchType, searchText }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        setHospitalList(data);
      });
  };
  return (
    <div>
      <div className="appointment-container">
        <div className="appointment-header">
          <div className="appointment-header-title">Book Appointment</div>
          <div className="appointment-header-search">
            <div className="appointment-header-search-type">
              <select
                name="searchType"
                id="searchType"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="hospital">Hospital</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div className="appointment-header-search-text">
              <input
                type="text"
                name="searchText"
                id="searchText"
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="appointment-header-search-button">
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
        <div className="appointment-hospital-list">
            {hospitalList && hospitalList.map((hospital,index) => (
                <div onClick={() => handleNavigation(hospital._id)}>
                <HospitalCard key={index} hospitalData={hospital} />
                </div>
            ))}
            </div>


      </div>
    </div>
  );
};

export default Appointment;
