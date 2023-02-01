// SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import "./ehr.sol";

contract base is ehr{

    //set the owner of the network
    constructor(){
        // owner = msg.sender;
        isOwner[msg.sender] = true;
    }
}   