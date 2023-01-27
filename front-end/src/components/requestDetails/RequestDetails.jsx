import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components'


const RequestViewContainer = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 30px;
    box-shadow:    5px 5px 10px #ccc;
    border-radius: 5px;
    `;

    const Title=styled.div`
    margin:0 0 10x 0;
    text-align:center;
    font-size:20px;
    `;
    const CloseButton=styled(CloseIcon)`
    position:absolute;
    top:10px;
    right:10px;
        color:grey:
        cursor:pointer;
    `;
    const Data=styled.div`
    margin:10px 0;
    display:block;
    font-weight: bold;
    font-size: 1.2rem;
    `;
const RequestDetails = ({request}) => {
  console.log("request :: " , request);
    const[isOpen,setIsOpen]=useState(false)
    if(!isOpen){
        return(
          
                <button onClick={()=>setIsOpen(true)}>View Details</button>
           
        )
    }
  return (
    
    // <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',backgroundColor: 'white'}}>
    //   <button onClick={() => setIsOpen(false)}>Close</button>
    //   <h2>Request Details</h2>
    //   <div>Name: {request.name}</div>
    //   <div>Email: {request.contact}</div>
    //   <div>Request Type: {request.requestType}</div>
    // </div>

    <RequestViewContainer>
      <CloseButton onClick={() => setIsOpen(false)} />
      <Title>Request Details</Title>
      <Data>Name: {request.name}</Data>
     
      <Data>Request Type: {request.type}</Data>
      <Data>Contact: {request.contact}</Data>
      {/* <Data>Address: {request.address}</Data> */}
      {/* <Data>City: {request.address.city}</Data>
      <Data>State: {request.addres.state}</Data> */}
      {/* <Data>Pincode: {request.address.pincode}</Data> */}
    </RequestViewContainer>
  )
}

export default RequestDetails