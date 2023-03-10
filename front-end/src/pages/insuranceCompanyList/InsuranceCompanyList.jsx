import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './insuranceCompanyList.css'

const InsuranceCompanyList = () => {
    const [insuranceCompanyList, setInsuranceCompanyList] = useState([])
    const walletAddress= useSelector((state) => state.walletAddress)
    useEffect(() => {
        fetch("http://localhost:3001/insuranceCompany/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        }).then((res) => res.json())

            .then((data) => {
                console.log(data, "data");
                setInsuranceCompanyList(data.insuranceCompany);
            });
    }, [])
    
const handleClaim = (insuranceCompanyId) => {
    console.log(walletAddress, "walletAddress");
    fetch("http://localhost:3001/patient/approveInsuranceCompany", {
        method: "POST",
        body: JSON.stringify({walletAddress, insuranceCompanyId}),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
    if(res.status === 200){
        return res.json()
    }
    else{
        alert(" error here")
    }
    
   
})


        .then((data) => {
            console.log(data, "data");
            // setInsuranceCompanyList(data.insuranceCompany);
        }
        );
}

  return (
    <div className='insurance-company-claim-container'>
        <h1>Insurance Company List</h1>
        <table className='insurance-company-claim-list'>
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Contact</th>
                    <th>Insurace Claim</th>
                </tr>
            </thead>
            <tbody>
                {insuranceCompanyList.map((insuranceCompany) => (
                    <tr>
                        <td>{insuranceCompany.name}</td>
                        <td>{insuranceCompany.contact}</td>
                        <td><button onClick={() => handleClaim(insuranceCompany._id)}>Claim</button></td>
                     
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default InsuranceCompanyList