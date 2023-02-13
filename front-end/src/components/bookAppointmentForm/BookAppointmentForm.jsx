import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './bookAppointmentForm.css';

const BookAppointmentForm = (props) => {
   const [patientId, setPatientId] = useState('63ced71965a9bbd2544ad104');
    const [doctorId, setDoctorId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState({
        startTime: '',
        endTime: '',
        date: '',

    });
    const [currentPage, setCurrentPage] = useState(0);
    const slotsPerPage = 5;
    const totalPages = Math.ceil(slots.length / slotsPerPage);
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };

    // useEffect(() => {
      
    // }, [appointmentDate]);

    const getSloats = () => {

        const data=fetch(`http://localhost:3001/patient/availableSlots/${props.doctorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: appointmentDate
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data, 'data');
                    setSlots(data);
                })
                .catch(error => {
                    console.error(error);
                });
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedSlot, 'selectedSlot');
        const data=fetch(`http://localhost:3001/patient/bookAppointment/${props.doctorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   
                    date: selectedSlot.date,
                    startTime: selectedSlot.startTime,
                    endTime: selectedSlot.endTime,
                    patientId: patientId
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data, 'data');
                }
                )
                .catch(error => {
                    console.error(error);
                }
                );


    }

    return (
        <div className='bookAppointmentForm'>
        <form onSubmit={handleSubmit}>
        
            <div className='bookAppointmentForm-input'>
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
            </div>
            <button type="button" onClick={getSloats}>Get Slots</button>
            <div>
      {slots.slice(currentPage * slotsPerPage, (currentPage + 1) * slotsPerPage).map((slot, index) => (
        <div key={index} className='slot-container'>
          <p className='slot-box' onClick={
           () => setSelectedSlot({
                ...selectedSlot,
                startTime: slot.startTime,
                endTime: slot.endTime,
                date: appointmentDate
            })
          }>{slot.startTime} - {slot.endTime}</p>
          
        </div>
      ))}
      {/* <h3>{selectedSlot.date}</h3> */}
      <div className='slot-pagination'>
        {currentPage > 0 && <button onClick={handlePrevPage}>Previous</button>}
        {currentPage < totalPages - 1 && <button onClick={handleNextPage}>Next</button>}
      </div>
    </div>
            {/* <div className='bookAppointmentForm-input'>
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input type="time" id="appointmentTime" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
            </div> */}
            {/* <ul>
                {slots && slots.map(slot => (
                    <li key={slot.startTime}>
                        <input type="radio" id={slot} name="slot" value={slot.startTime} onChange={e => setSelectedSlot(e.target.value)} />
                        <label htmlFor={slot.startTime}>{slot.startTime} - {slot.endTime} </label>
                    </li>
                ))}
            </ul> */}

            <button type="submit" >Book Appointment</button>
        </form>
        </div>
    );
};

export default BookAppointmentForm;
