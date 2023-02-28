import React from 'react'
import { useLocation } from 'react-router-dom'

const LabReport = () => {
    const location = useLocation()
    const patientId=location.state.pId
    const docWalletAddress=location.state.labTechWalletAddress
    
  return (
    <div>LabReport</div>
  )
}

export default LabReport