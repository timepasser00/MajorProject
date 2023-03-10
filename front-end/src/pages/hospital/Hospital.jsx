import { selectClasses } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookAppointmentForm from "../../components/bookAppointmentForm/BookAppointmentForm";
import DoctorList from "../../components/doctorList/DoctorList";
import EmployeeApprove from "../../components/employeeApprove/EmployeeApprove";
import EnrollDoctorForm from "../../components/enrollDoctor/EnrollDoctorForm";
import "./hospital.css";

const Hospital = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("list");
  // const [walletAddress, setWalletAddress] = useState("");
  const walletAddress = useSelector((state) => state.walletAddress);
  const userType = useSelector((state) => state.category);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // const id = "63cefc0155c2fcfa7ec4bf32";

  useEffect(() => {
    console.log(walletAddress)
    console.log(userType);
    console.log(userType === "patient");
  }, []);

  return (
    <div className="hospital-container">
      <div className="hospital-tabs">
        <div
          className={`tab ${selectedTab === "list" ? "active" : ""}`}
          onClick={() => handleTabChange("list")}
        >
          Doctor List
        </div>
        {(userType !== "hospital" && userType !== "lab" && userType !== "insuranceCompany" && userType !== "patient") && (
          <div
            className={`tab ${selectedTab === "enroll" ? "active" : ""}`}
            onClick={() => handleTabChange("enroll")}
          >
            Doctor Enrollment
          </div>
        )}
        {/* <div className={`tab ${selectedTab === "appointment" ? "active" : ""}`} onClick={() => handleTabChange("appointment")}>Book Appointment</div> */}
        {userType === "hospital" && (
          <div
            className={`tab ${selectedTab === "approve" ? "active" : ""}`}
            onClick={() => handleTabChange("approve")}
          >
            Approve Doctor
          </div>
        )}
      </div>
      <div className="hospital-container-tab">
        {selectedTab === "list" && <DoctorList id={id} />}
        {/* {userType !== "hospital" && selectedTab === "enroll" && <EnrollDoctorForm id={id} />} */}
        {userType === "" && selectedTab === "enroll" && <EnrollDoctorForm id={id} />}
        {/* {selectedTab === "appointment" && <BookAppointmentForm/>} */}
        {selectedTab === "approve" && (
          <EmployeeApprove
            type={"hospital"}
            hospitalId={id}
            empWalletAddress={walletAddress}
          />
        )}
      </div>
    </div>
  );
};

export default Hospital;
