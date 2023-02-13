// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;
import "./enroll.sol";

contract ehr is enroll {
 
    modifier onlyPatient(){
        require(isPatient[msg.sender],"invalid request");
        _;
    }

    modifier onlyDoctor(){
        require(isDoctor[msg.sender],"not a doctor");
        _;
    }

    modifier onlyLabTech(){
        require(isLabTech[msg.sender],"not a labTech");
        _;
    }


    // 0 - not allowed to see the reports
    // other - allowed to see the reports
   
   function handleEhrPermission(
       string memory _id,
       uint256 _code 
   )public
   onlyPatient()
   isValidId(_id)
   {
       address _Address = Address[_id];
       require(isDoctor[_Address] || isLabTech[_Address] || isInsuranceCompany[_Address],"not a valid participant");
        require((_code == 0 && patientRecord[msg.sender].isApprovedParticipants[_id]) ||
        (_code != 0 && !patientRecord[msg.sender].isApprovedParticipants[_id]),"invalid request");
       if(_code == 0){
           patientRecord[msg.sender].isApprovedParticipants[_id] = false;
       }else{
           patientRecord[msg.sender].isApprovedParticipants[_id] = true;
       }     
       
   }

   function setMedInfoHash(
       string memory _mHash,
       string memory _labTestInfoHash,
       string memory _patientId
   )public
   onlyDoctor()
   isValidId(_patientId)
   {
       address _patientAddress = Address[_patientId];
       string memory docId = Id[msg.sender];
       require(isPatient[_patientAddress] ,"not a patient");
       require(patientRecord[_patientAddress].isApprovedParticipants[docId], "not an approved doctor");
       patientRecord[_patientAddress].prescriptionCnt++;
       uint256 cnt = patientRecord[_patientAddress].prescriptionCnt;
       patientRecord[_patientAddress].prescriptionRecord[cnt].medicineCid = _mHash;
       patientRecord[_patientAddress].prescriptionRecord[cnt].labTestCid = _labTestInfoHash;
   }

   function setLabReportHash(
       string memory _labReportInfoHash,
       string memory _patientId,
       uint256 prescriptionId
   )public
   onlyLabTech()
   isValidId(_patientId)
   {
       address _patientAddress = Address[_patientId];
       string memory labTechId = Id[msg.sender];
       require(prescriptionId <= patientRecord[_patientAddress].prescriptionCnt , "invalid id");
       require(isPatient[_patientAddress] ,"not a patient");
       require(patientRecord[_patientAddress].isApprovedParticipants[labTechId], "not an approved labTech");
       patientRecord[_patientAddress].prescriptionRecord[prescriptionId].labReportCid = _labReportInfoHash;
   }

   function getPrescription(
       string memory _patientId,
       uint256 prescriptionId
   )public view
   isValidId(_patientId)
   returns(string memory , string memory, string memory)
   {
       address _patientAddress = Address[_patientId];
       require(prescriptionId <= patientRecord[_patientAddress].prescriptionCnt , "invalid id");
       require(
           isPatient[msg.sender] ||
           (isDoctor[msg.sender] && patientRecord[_patientAddress].isApprovedParticipants[Id[msg.sender]]) ||
            (isInsuranceCompany[msg.sender] && patientRecord[_patientAddress].isApprovedParticipants[Id[msg.sender]]) ,
            "not an authorized access"
       );
        string memory _mHash = patientRecord[_patientAddress].prescriptionRecord[prescriptionId].medicineCid;
        string memory _labTestInfoHash = patientRecord[_patientAddress].prescriptionRecord[prescriptionId].labTestCid;
        string memory _labReportHash = patientRecord[_patientAddress].prescriptionRecord[prescriptionId].labReportCid;
       return(_mHash , _labTestInfoHash, _labReportHash);
   }

    function requiredLabTest(
        string memory _patientId ,
        uint256 prescriptionId
    )public view
    isValidId(_patientId)
    onlyLabTech()
    returns (string memory)
    {
        address _patientAddress = Address[_patientId];
        require(patientRecord[_patientAddress].isApprovedParticipants[Id[msg.sender]], "not an approved labTech");
        string memory _labTestInfoHash = patientRecord[_patientAddress].prescriptionRecord[prescriptionId].labTestCid;
        return _labTestInfoHash;
    }



}