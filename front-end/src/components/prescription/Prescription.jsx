import React from "react";
import Body from "./Body";
import Header from "./Header";

const Prescription = () => {
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
      "fever",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
      "cough",
      "headache",
      "diarrhea",
      "nausea",
      "vomiting",
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
    <div>
      <Header />
      <Body
        patient={data.patient}
        doctor={data.doctor}
        referral={data.referral}
        symptoms={data.symptoms}
        tests={data.tests}
        medications={data.medications}
      />
    </div>
  );
};

export default Prescription;
