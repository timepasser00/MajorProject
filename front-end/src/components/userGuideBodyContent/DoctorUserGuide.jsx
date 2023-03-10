import React from 'react'

const DoctorUserGuide = () => {
  return (
    <div className="doctor-user-guide-body-content">
       <span className='content-title'>How to get registered on the palatform ?</span>
       <p className='content'>
        To get registered on the platform you need to have ETH account connected with metamask.
        <br/><b>Step 1 :</b> If you have , then <b>click</b> on Search any Hospital, which you want to be part of. <br/>
        <b>Step 2 : </b> Select the hospital from the result.<br/>
        <b>Step 3 : </b> <b>Click </b> on the <b>Doctor Enrollment</b> section. <br/>
        <b>Step 4 : </b> Enter the required details and <b>click</b> on <b>Submit</b><br/>
        <b>Once the hospital verifies and accepts your application, you can be part of that hospital and this platform</b>
       </p>
       <span className='content-title'>How to view past medical records of a patient ?</span>
       <p className='content'>
       Log In to your accoutn.<br/>
        <b>Step 1 : </b>Click on <b>Get Past Prescription</b> for the respective patient<br/>
        <b>Step 2 : </b>Select the prescription index. <br/>
        <b>Step 3 : </b>Click on <b>Submit</b>.
       </p>
       <span className='content-title'>How to create prescription ?</span>
       <p className='content'>
       Log In to your accoutn.<br/>
        <b>Step 1 : </b>Click on <b>Create Prescription</b> for the respective patient<br/>
        <b>Step 2 : </b>Enter the relevant details<br/>.
        <b>Step 3 : </b>Click on <b>Submit</b>.
       </p>
    </div>
  )
}

export default DoctorUserGuide