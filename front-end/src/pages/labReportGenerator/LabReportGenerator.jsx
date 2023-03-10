import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./labReportGenerator.css";
const LabReportGenerator = () => {
  const location = useLocation();
  const patientId = location.state.pId;
  const labTechWalletAddress = location.state.labTechWalletAddress;
  const [prescriptionCnt, setPrescriptionCnt] = useState(0);
  const [labTests, setLabTests] = useState([]);
  const [labReport, setLabReport] = useState([]);

  useEffect(() => {
    console.log(labReport, "labReport");
    const getPrescriptionId = async () => {
      
        fetch(`http://localhost:3001/doctor/getPrescriptionCnt/${patientId}`, {
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
            setPrescriptionCnt(data.prescriptionCnt);
            console.log(data, "data");
          });
        // console.log("Doctor");
      };
      getPrescriptionId();


    }, []);

  

  const getLabTestInfo = async (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:3001/doctor/getLabTestInfo/${patientId}/${prescriptionCnt}/${labTechWalletAddress}`,
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
        setLabTests(() => data.finalLabTestInfo);
        console.log(data.finalLabTestInfo, "finalLabTestInfo");
        console.log(data, "data");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/doctor/setLabReport", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            patientId: patientId,
            walletAddress: labTechWalletAddress,
            labReport: labReport,
            prescriptionId: prescriptionCnt,
        }),
    })

        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert(" error here");
            }
        }
        )
        .then((data) => {
            console.log(data, "data");
            alert("Successfully Uploaded");
        }
        );
        
  };
//   const handleInputChange = (index, e) => {
   
    // setLabReport((prev) => [
    //     ...prev,
    //     {
    //         name: labTests[index].label,
    //         result: e.target.value,
    //     },
    // ]);

    const handleInputChange = (index, e) => {
        setLabReport(prev => {
          const updatedLabReport = [...prev];
          updatedLabReport[index] = {
            name: labTests[index].label,
            result: e.target.value
          };
          return updatedLabReport;
        });
      };

  return (
    <div className="labReportGenerator-page-container">
      <h2>Lab Report Generator</h2>
      {/* <button onClick={getPrescriptionId}>getPresctioni</button> */}
      <button onClick={getLabTestInfo}>getLabTestInfo</button>

      <div className="labReportGenerator-page-body">
        <h3>Lab Tests</h3>
        <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {labTests.length > 0 && labTests.map((test, index) => (
            <tr key={test.value}>
              <td>{test.label}</td>
              <td>
                <input
                  type="text"
                  placeholder={test.label}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
</form>
      </div>
    </div>
  );
};
export default LabReportGenerator;
