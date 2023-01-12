import React, { useState } from 'react';
import './prescription.css'
import qr_code from '../../Assets/images/qr_sample.jpg'
const Body = ({ patient, doctor, referral, symptoms, tests, medications }) => {
  // Initialize the current page and set of items to display
  console.log(symptoms)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="medical-record">
      {/* Patient information */}
      <div className="patient-info">
        <div className='pateint-info-left'>
        <h3>Patient: {patient.name}</h3>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
        <div className="doctor-info">
        <p><strong>Doctor:</strong> {doctor.name}</p>
        { referral && <p><strong>Referred by:</strong> {referral.name}</p> }
      </div>
        </div>
        <img src={qr_code} alt="qr_code" className="qr-code" />
      </div>

      {/* Doctor and referral information */}
      {/* <div className="doctor-info">
        <p><strong>Doctor:</strong> {doctor.name}</p>
        { referral && <p><strong>Referred by:</strong> {referral.name}</p> }
      </div> */}

      {/* Symptoms */}
      <div className="symptoms">
        <h4>Symptoms:</h4>
        <ul>
          {symptoms.slice(startIndex, endIndex).map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      </div>

      {/* Lab tests */}
      <div className="tests">
        <h4>Lab Tests:</h4>
        <table>
          <tr>
            <th>Test</th>
            <th>Result</th>
          </tr>
          {tests.slice(startIndex, endIndex).map((test, index) => (
            <tr key={index}>
              <td>{test.name}</td>
              <td>{test.result}</td>
            </tr>
          ))}
        </table>
      </div>

      {/* Medications */}
      <div className="medications-list">
        <h4>Medications:</h4>
        <table>
          <tr>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Frequency</th>
          </tr>
          {medications.slice(startIndex, endIndex).map((medication, index) => (
            <tr key={index}>
              <td>{medication.name}</td>
              <td>{medication.dose}</td>
              <td>{medication.frequency}</td>
            </tr>
          ))}
        </table>
      </div>

      {/* Pagination */}
            {/* Pagination */}
            { symptoms.length > itemsPerPage && (
        <div className="pagination">
          {/* Previous button */}
          { currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          )}

          {/* Page numbers */}
          {[...Array(Math.ceil(symptoms.length / itemsPerPage)).keys()].map((page) => (
            <button
              key={page + 1}
              className={page + 1 === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}

          {/* Next button */}
          { currentPage < Math.ceil(symptoms.length / itemsPerPage) && (
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;


