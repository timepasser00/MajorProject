import React from "react";
import PatientDetailsForm from "../components/PatientDetailsForm";
import { useState, useEffect } from "react";
import Temp from "./Temp";
import { useSelector } from "react-redux";

const PatientDetails = () => {
  const [flag, setFlag] = useState(true);
  const [details, setDetails] = useState([]);
  // const [walletAddress, setWalletAddress] = useState("");
  const walletAddress = useSelector((state) => state.walletAddress);
  useEffect(() => {
    console.log("walletAddress  from pdetails:: ", walletAddress);
    getDetails(walletAddress);
  }, [walletAddress, flag]);

  const getDetails = async (walletAddress) => {
    console.log("walletAddress from get details:: ", walletAddress);
    const response = await fetch(
      "http://localhost:3001/patient/patientPersonalDetails",
      {
        method: "POST",
        body: JSON.stringify({ walletAddress }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    
    console.log(data);
    // console.log(data[data.length - 1],'data[data.length - 1');
    if (response.ok) {
      setDetails(data);
      if(data.length > 0){
      setFlag(false);
      }
      console.log("success");
      // let objProp = data.map(Emp => console.log( Emp.firstName));
      // console.log(objProp);
    }
  };

  return (
    <div>
      {flag && (
        <>
          <PatientDetailsForm />
        </>
      )}

      {!flag &&
        details &&
        details.map((patient) => (
          <Temp patient={patient} key={patient._id}></Temp>
        ))}
    </div>
  );
};

export default PatientDetails;
