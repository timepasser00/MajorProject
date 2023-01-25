import React from "react";
import Prescription from "../../components/prescription/Prescription";
import "./prescriptionGenerator.css";
import { useState, useEffect } from "react";
import makeAnimated from "react-select/animated";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";

import {
  symptomOptions,
  medicationsOptions,
} from "../../Assets/constants/options";
const animatedComponents = makeAnimated();

const PrescriptionGenerator = () => {
  const customStyles = {
    control: (base, state) => ({
      ...base,

      width: "300px",
    }),
    option: (base, state) => ({
      ...base,
      width: "300px",
    }),
  };
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [doctor, setDoctor] = useState({
    name: "",
    qualification: "",
  });
  const [referral, setReferral] = useState({
    name: "",
  });
  const [symptoms, setSymptoms] = useState([]);
  const [medications, setMedications] = useState([]);

  const [selectedMedications, setSelectedMedications] = useState([]);

  //   useEffect(() => {
  //     console.log("Selected symptoms are: ", symptoms);
  //     console.log("Selected medications are: ", selectedMedications);

  //     console.log("Final medications are: ", medications);
  //   }, [symptoms, selectedMedications, medications]);

  return (
    <>
      <div className="prescription-gen-container">
        <span className="pres-left">
          <form>
            <div>
              <label htmlFor="patient-name">Patient Name: </label>
              <input
                id="patient-name"
                type="text"
                placeholder="Enter patient's name"
                onChange={(e) => {
                  setPatient({ ...patient, name: e.target.value });
                }}
              />
            </div>

            <div>
              <label htmlFor="patient-age">Patient's Age: </label>
              <input
                id="patient-age"
                type="number"
                placeholder="Enter patient's age"
                onChange={(e) => {
                  setPatient({ ...patient, age: e.target.value });
                }}
              />
            </div>

            <div>
              <label htmlFor="patient-gender">Gender: </label>
              <select
                name="patient-gender"
                id="patient-gender"
                onChange={(e) => {
                  setPatient({ ...patient, gender: e.target.value });
                }}
              >
                <option value={null}>Select </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="symptom">Symptoms: </label>
              <CreatableSelect
                components={animatedComponents}
                isMulti
                defaultValue={symptoms}
                onChange={setSymptoms}
                options={symptomOptions}
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
                styles={customStyles}
              />
            </div>

            <div>
              <label htmlFor="">Medication: </label>
              <CreatableSelect
                components={animatedComponents}
                isMulti
                defaultValue={selectedMedications}
                onChange={setSelectedMedications}
                options={medicationsOptions}
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                isLoading={false}
                isRtl={false}
                closeMenuOnSelect={false}
                styles={customStyles}
              />
            </div>

            {selectedMedications &&
              selectedMedications.map((med, index) => (
                <>

                  <div>{med.label}</div>
                  <div>
                    <label htmlFor="med-dose">Dose: </label>
                    <input
                      id="med-dose"
                      required
                      type="text"
                      placeholder={`Enter dose for ${med.label}`}
                      onChange={(e) => {
                        setMedications({
                          ...medications,
                          [index]: {
                            ...medications[index],
                            dose: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="med-freq">Frequency: </label>
                    <input
                      id="med-freq"
                      required
                      type="text"
                      placeholder={`Enter freq. for ${med.label}`}
                      onChange={(e) => {
                        setMedications({
                          ...medications,
                          [index]: {
                            ...medications[index],
                            frequency: e.target.value,
                            name: med.label,
                          },
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="med-dur">Duration: </label>
                    <input
                      id="med-dur"
                      required
                      type="text"
                      placeholder={`Enter dur. for ${med.label}`}
                      onChange={(e) => {
                        setMedications({
                          ...medications,
                          [index]: {
                            ...medications[index],
                            duration: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </>
              ))}
          </form>
        </span>
        <span className="pres-right">
          <Prescription
            patient={patient}
            medications={Object.keys(medications).map(
              (key) => medications[key]
            )}
            medicationName={selectedMedications} symptoms={symptoms}
          />
        </span>
      </div>
    </>
  );
};

export default PrescriptionGenerator;
