import React from 'react'
import './userGuideBody.css'

const PatientUserGuide = () => {
  return (
    <div className="patient-user-guide-body-content">
       <span className='content-title'>How to get registered on the palatform ?</span>
       <p className='content'>
        To get registered on the platform you need to have ETH account connected with metamask.
        <br/><b>Step 1 :</b> If you have , then <b>click</b> on <b>SignUp/Login</b> option on the Home Page.   <br/>
        <b>Step 2 : </b> Select <b>Patient</b> in sign up option and <b>click</b> on <b>Sign Up</b><br/>
        <b>Step 3 : </b> Enter the required details and <b>click</b> on <b>Submit</b>
       </p>
       <span className='content-title'>How to make doctors appointment ?</span>
       <p className='content'>
        Log In to your account. <br/> 
        <b>Step 1 : </b> Clik on <b>My Doctor's List</b><br/>
        <b>Step 2 : </b> Choose the doctor from the list and clik on <b>Book Appointment</b><br/>
        <b>Note :</b> If the table is empty, first you need to approve doctors.
       </p>
       <span className='content-title'>How to approve a doctor ?</span>
       <p className='content'>
        Log In to your accoutn.<br/>
        <b>Step 1 : </b>Select the category <br/>
        <b>Step 2 : </b>Enter the name or city name. <br/>
        <b>Step 3 : </b>Select the relevant search result.
        <b>Step 4 : </b>Aprrove from the list of doctors/labs.
       </p>
       <span className='content-title'>How to revoke access to health record ? </span>
       <p className='content'>
        Log In to your account. <br/>
        <b>Step 1 : </b>Click on <b>My Doctor's List</b><br/>
        <b>Step 2 : </b>Clikc on <b>Revoke</b>
       </p>
       <span className='content-title'>How to get past health records ?</span>
       <p className='content'>
       Log In to your accoutn.<br/>
        <b>Step 1 : </b>Click on <b>My Prescriptions</b>. <br/>
        <b>Step 2 : </b>Select the prescription index. <br/>
        <b>Step 3 : </b>Click on <b>Submit</b>.
       </p>
       <span className='content-title'>How to claim Health Insurance ?</span>
       <p className='content'>
        Log in to you account. <br/>
        <b>Step 1 : </b>Search for the Insurance Company.<br/>
        <b>Step 2 : </b>Click on claim.
       </p>
       <span className='content-title'>How do I find any Hospital or Lab ?</span>
       <p className='content'>
        <b>Step 1 : </b>On the <b>Home Page</b> select the category which you want to search. <br/>
        <b>Step 2 : </b>Enter any key terms like <b>Name , City </b>.<br/>
        <b>Step 3 : </b>Click on search.
       </p>
    </div>
  )
}

export default PatientUserGuide