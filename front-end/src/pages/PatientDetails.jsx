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
    // fetch("http://localhost:3001/patient/patientPersonalDetails", {
    //   method: "POST",
    //   body: JSON.stringify({ walletAddress }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data, "data");
    //     // console.log(data[data.length - 1],'data[data.length - 1');
    //     // if (data.length > 0) {
    //     //   setFlag(false);
    //     // }
    //     setDetails(data);
    //     console.log(details, "details");
    //   });

      
    console.log("walletAddress  from pdetails:: ", walletAddress);
    // getDetails(walletAddress);
  }, [walletAddress, flag, details]);

  // const getDetails = async (walletAddress) => {
  //   console.log("walletAddress from get details:: ", walletAddress);
  //   const response = await fetch(
  //     "http://localhost:3001/patient/patientPersonalDetails",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({ walletAddress }),
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   const data = await response.json();
    
  //   console.log(data, "data");
  //   // console.log(data[data.length - 1],'data[data.length - 1');
  //   if (response.ok) {
  //     // const value= Object.keys(data).map(
  //     //   (key) => data[key]
  //     // )
  //     // setDetails(value);
  //     setDetails(data);
  //     console.log(details, "details");

  //     // if(data.length > 0){
  //     // setFlag(false);
  //     // }
  //     setFlag(false);
  //     console.log("success");
  //     // let objProp = data.map(Emp => console.log( Emp.firstName));
  //     // console.log(objProp);
  //   }
  // };


  // const handleRequest = async() => {
  //   console.log(walletAddress);
  //   // console.log(selectedOption);
  //   const data = {walletAddress,patient:'patient'};
  //   const url = 'http://localhost:3001/home/signUp';
  //   console.log(url);
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {  
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const msg = await response.text();
  //   console.log(msg);
  //   alert(msg);     
  // };

  return (
    <div>
      {flag && (
        <>
          <PatientDetailsForm />
        </>
      )}

      {/* { 
        details &&
        details.map((patient) => (
          <Temp patient={patient} key={patient._id}></Temp>
        ))} */}
        
        {/* <>
        
        {
          // details && details.map((patient,index) => (
            <Temp patient={details} ></Temp>
          // ))
        }
        </> */}
    </div>
  );
};

export default PatientDetails;
