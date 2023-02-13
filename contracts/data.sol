// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;


contract data {

    mapping(address => bool)public isOwner;
    mapping(address => bool)public isHospital;
    mapping(address => bool)public isLab;
    mapping(address => bool)public isInsuranceCompany;
    mapping(address => bool)public isPatient;
    mapping(address => bool)public isDoctor;
    mapping(address => bool)public isLabTech;
    mapping(address => bool)public isMedShop;
    mapping(address => bool)public isInsuranceWorker;
    mapping(address => address)public worksAt;
    mapping(address => string)public Id;
    mapping(string => address)public Address;
    mapping(address => bool) public isParticipant;
    // patient
    struct prescription{
        string  medicineCid;
        string  labTestCid;
        string  labReportCid;
    }

    struct medicalRecord{
        mapping(uint256 => prescription)prescriptionRecord;
        mapping(string => bool) isApprovedParticipants;
        uint256 prescriptionCnt;
    }

    mapping(address => medicalRecord)public patientRecord;

    function getId(address _address)public view returns(string memory){
        return Id[_address];
    }

    function getAddress(string memory _id)public view returns(address){
        return Address[_id];
    }

    function getPrescriptionCnt(address _address)public view returns(uint256){
        return patientRecord[_address].prescriptionCnt;
    }
    


}