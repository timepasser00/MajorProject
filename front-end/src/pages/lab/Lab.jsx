import React from 'react'
import {useParams} from 'react-router-dom'
import{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import LabTechList from '../../components/labTechList/LabTechList'
import LabTechJoinRequest from '../../components/labTechJoinRequest/LabTechJoinRequest'
import EmployeeApprove from '../../components/employeeApprove/EmployeeApprove'
import './lab.css'

const Lab = () => {
    const {id}=useParams();
    const [selectedTab, setSelectedTab] = useState("list");
    const [walletAddress, setWalletAddress] = useState("");
    const tempwalletAddress = useSelector(state => state.walletAddress);
    useEffect(() => {
        setWalletAddress(tempwalletAddress);
        console.log(walletAddress);
    }, [walletAddress])

const handleTabChange = (tab) => {
    setSelectedTab(tab);
}

  return (
    <div className='lab-container'>
        <div className='lab-tabs'>
        <div className={`tab-${selectedTab === "list" ? "active" : ""}`} onClick={() => handleTabChange("list")}>Lab Tech List</div>
        <div className={`tab-${selectedTab === "enroll" ? "active" : ""}`} onClick={() => handleTabChange("enroll")}>Enroll Lab Tech</div>
        <div className={`tab-${selectedTab === "approve" ? "active" : ""}`} onClick={() => handleTabChange("approve")}>Approve Lab Tech</div>
        </div>
        <div className='lab-container-tab'>
    {selectedTab === "list" && <LabTechList id={id}/>}
        {selectedTab === "enroll" && <LabTechJoinRequest id={id} walletAddress={walletAddress}/>}
        {selectedTab === "approve" && <EmployeeApprove type={'lab'} labId={id} empWalletAddress={walletAddress}/>}
        </div>
    </div>
  )
}

export default Lab