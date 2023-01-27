import React from 'react'

const Temp = (props) => {
  console.log(props, 'props')
// console.log(patient,"from temp");
  return (
   <>
            {/* <h4>{props.firstName}</h4> */}
            {/* <h4>{patient.patient.lastName}</h4>
            <h4>{patient.patient.age}</h4>
            <h4>{patient.patient.email}</h4> */}
            {/* <br></br>
            </> */}

{
  props.patient.map((patient) => {
    return (
      <div>
        <h4>{patient.firstName}</h4>
        <h4>{patient.lastName}</h4>
        <h4>{patient.age}</h4>
        <h4>{patient.email}</h4>
        <br></br>
      </div>
    );
}

  )
}

    </>
  );
};

export default Temp