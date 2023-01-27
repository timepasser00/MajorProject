import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import RequestDetails from '../requestDetails/RequestDetails';
import './mainAdminPage.css'
const MainAdminPage = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/hospital/requests")
        .then(res => res.json())
        .then(data => {
            console.log(data,"data")
            setRequests(data)
        })
        }, [])
    
    
const handleApprove = (id) => {
    console.log(requests,"requests before approval")
    const newRequests = requests.filter((r) => r._id !== id)
    fetch(`http://localhost:3001/admin/approve/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ id }),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data,"data") 
       
    })
 


    setRequests(newRequests)
    deleteRequest(id)
    console.log(requests,"requests after approval")
}
const handleRejection= (id) => {
    console.log(requests,"requests before rejection")
    const newRequests = requests.filter((r) => r._id !== id)
    setRequests(newRequests)
    console.log(requests,"requests after rejection")
    deleteRequest(id);
}
const deleteRequest = (id) => {


    fetch(`http://localhost:3001/admin/approve/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            },
                
    })
    .then(res => res.json())
    .then(data => {
        console.log(data,"data")
    })
}



  return (
    
    <div className='main-admin-page'>
        { requests && <>
        <h2>Requests</h2>
        <table>
            <thead>
    <tr>
        <th>Type</th>
        <th>Name</th>
        <th>Action</th>
    </tr>
            </thead>
            <tbody>
                {requests.map((request) => (
                    <tr >
                        <td>{request.type}</td>
                        <td>{request.name}</td>
                        <td>
                        <button  className='approve' onClick ={() => handleApprove(request._id)}>Approve</button>
                        <button className='reject' onClick ={() => handleRejection(request._id)}>Reject</button>
                        <RequestDetails request={request}/>
                        </td>
                        
                    </tr>
                ))}
            </tbody>
            </table>
            </>}
    </div>
                
  )
}

export default MainAdminPage