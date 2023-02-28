import React from "react";
import Body from "./Body";
import Header from "./Header";

const Prescription = (props) => {

  console.log(props, "props");
  const data = {
    patient: {
      name: "John Doe",
      age: 25,
      gender: "Male",
    },
    doctor: {
      name: "Dr. John Doe",
    },
    referral: {
      name: "Dr. John Doe referral",
    },
    symptoms: [
      {
        label: "Fever",
        value: "fever",
      },
      {
        label: "Cough",
        value: "cough",
      },
      {
        label: "Headache",
        value: "headache",
      },
      {
        label: "Diarrhea",
        value: "diarrhea",
      },
      {
        label: "Nausea",
        value: "nausea",
      },
      {
        label: "Vomiting",
        value: "vomiting",
      },
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
      // "cough",
      // "headache",
      // "diarrhea",
      // "nausea",
      // "vomiting",
    ],
    medications: [
      {
        name: "anti-biotic",
        dose: "1 tablet",
        frequency: "twice a day",
        duration: "5 days",
      },
      {
        name: "anti-biotic",
        dose: "1 tablet",
        frequency: "twice a day",
        duration: "5 days",
      },
      {
        name: "anti-biotic",
        dose: "1 tablet",
        frequency: "twice a day",
        duration: "5 days",
      },
      {
        name: "anti-biotic",
        dose: "1 tablet",
        frequency: "twice a day",
        duration: "5 days",
      },
    ],
    tests: [
      { name: "blood test", result: "positive" },
      { name: "blood test", result: "positive" },
      { name: "blood test", result: "positive" },
      { name: "blood test", result: "positive" },
    ],
  };
  return (
    <div className="prscription-container">
      <Header />
      <Body
        patient={props.patient}  //
        doctor={props.doctor}  //
        referral={data.referral}
        symptoms={props.symptoms}
        tests={props.tests}
        medications={props.medications}
        view={props.view}
        
      />
      
    </div>
  );
};

export default Prescription;
