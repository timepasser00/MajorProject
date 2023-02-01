// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;
import "./data.sol";

contract enroll  is data{
    
    //code - participant
    // 0 - patient
    // 1 - hospital
    // 2 - lab
    // 3 - insurance
    // 4 - doctor
    // 5 - labTech
    // 6 - insuranceWorker
    

    //modifier

    modifier onlyOwner(){
        require(isOwner[msg.sender],"sender is not the owner");
        _;
    }

    modifier onlyHospital(){
        require(isHospital[msg.sender],"sender is not a hospital");
        _;
    }



    modifier isValid(address _address){
        require(_address != address(0x0),"null address found");
        require(!isOwner[_address],"owner's address");
        require(!isParticipant[_address],"pre-existing address");
        _;
    }

    modifier isValidId(string memory _id){
        address _address = Address[_id];
        require(isParticipant[_address] , "not a valid id");
        _;
    }


    // functions 
    // owner adds clients
    
    
    //code - paticipant
    // 0 - patient
    // 1 - hospital
    // 2 - lab
    // 3 - insurance
    // 4 - medShop
    // 5 - doctor
    // 6 - labTech
    // 7 - insuranceWorker

    function addClient(
        address _clientAddress,
        uint32 category,
        string memory _id
    )public
    onlyOwner
    isValid(_clientAddress)
    {
        isParticipant[_clientAddress] = true;
        Id[_clientAddress] = _id;
        Address[_id] = _clientAddress;
        if(category == 0){
            isPatient[_clientAddress] = true;
        }else if(category == 1){
            isHospital[_clientAddress] = true;
        }else if(category == 2){
            isLab[_clientAddress] = true;
        }else if(category == 3){
            isInsuranceCompany[_clientAddress] = true;
        }
    }

    // add employee
    function addEmplyoee(
        address _employeeAddress,
        string memory _id
    )public
    isValid(_employeeAddress)
    {
        require(isLab[msg.sender] || isHospital[msg.sender] || isInsuranceCompany[msg.sender], "not an institution");
        Id[_employeeAddress] = _id;
        Address[_id] = _employeeAddress;
        isParticipant[_employeeAddress] = true;
        if(isLab[msg.sender]){
            isLabTech[_employeeAddress] = true;
        }else if(isHospital[msg.sender]){
            isDoctor[_employeeAddress] = true;
        }else if(isInsuranceCompany[msg.sender]){
            isInsuranceWorker[_employeeAddress] = true;
        }
    }
}