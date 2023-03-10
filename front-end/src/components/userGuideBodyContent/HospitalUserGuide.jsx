import React from 'react'

const HospitalUserGuide = () => {
  return (
    <div className="hopital-user-guide-body-content">
       <span className='content-title'>How to get registered on the palatform ?</span>
       <p className='content'>
        To get registered on the platform you need to have ETH account connected with metamask.
        <br/><b>Step 1 :</b> If you have , then <b>click</b> on <b>SignUp/Login</b> option on the Home Page.   <br/>
        <b>Step 2 : </b> Select <b>Hospital</b> in sign up option and <b>click</b> on <b>Sign Up</b><br/>
        <b>Step 3 : </b> Enter the required details and <b>click</b> on <b>Submit</b><br/>
        <b>Note : On Successfull verification of the entered details your account will get activated.</b>
       </p>
       <span className='content-title'>How to process Doctor's request ?</span>
       <p className='content'>
        Log In through your hospital account.
        <b>Step 1 : </b>Click on <b>Approve Doctor</b><br></br>
        <b>Step 2 : </b>View the doctors request and Approve or Reject.
       </p>
    </div>
  )
}

export default HospitalUserGuide