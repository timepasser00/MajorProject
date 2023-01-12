import React from 'react'

const Temp = (patient) => {
console.log(patient,"from temp");
  return (
   <>
            <h4>{patient.patient.firstName}</h4>
            <h4>{patient.patient.lastName}</h4>
            <h4>{patient.patient.age}</h4>
            <h4>{patient.patient.email}</h4>
            <br></br>
            </>
  )
}

export default Temp