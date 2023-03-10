import React, { useEffect } from 'react'
import { useState } from 'react'
import './employeeApprove.css'
const EmployeeApprove = (props) => {
    const [requests, setRequests] = useState([]);
    const empWalletAddress=props.empWalletAddress;
    let orgId="";
    if(props.type==="lab"){
        orgId=props.labId;
    }
    else if(props.type==="hospital"){
        orgId=props.hospitalId;
    }

    useEffect(() => {
        console.log(props);
        console.log(empWalletAddress, "empWalletAddress")
        fetch(`http://localhost:3001/${props.type}/getRequests/${orgId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "data")
            setRequests(data.employeeRequest)
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )

    }, [])
    const handleApprove = (id,type) => {
        console.log(id, "id",props.type, "type", props.hospitalId, "hospitalId",`http://localhost:3001/${props.type}/register${type}/${id}`)
        // const newRequests = requests.filter((r) => r._id !== id)
        fetch(`http://localhost:3001/${props.type}/register${type}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({empWalletAddress}),
        })
        .then(res =>{
            if(res.status===200){
                const newRequsets = requests.filter((request)=>request._id !== id);
                setRequests(newRequsets);
                deleteRequest(id)
                return res.json()
            
            }
          
        } )
        .then(data => {
            console.log(data, "data")
 
        })
    }
    const deleteRequest = (id) => {
        fetch(`http://localhost:3001/hospital/deleteRequest/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
            .then(data => { 
                console.log(data, "data")
            })
            .catch((err) => {
                console.log(err);
            }
            )
    }


  return (
    <div  className='employee-approve-table'>


        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Qualification</th>
                    <th>Year of Experience</th>
                    <th>Approve</th>
                    </tr>
            </thead>
            <tbody>
                {requests && requests.map((request) => (
                    <tr>
                        <td>{request.firstName}</td>
                        <td>{request.lastName}</td>
                        <td>{request.qualification}</td>
                        <td>{request.yearOfExperience}</td>
                        <td>
                            <button onClick={() => handleApprove(request._id,request.employeeType)}>Approve</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        </div>

  )
}

export default EmployeeApprove