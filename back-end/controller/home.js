const  contract = require('@truffle/contract');
require('dotenv').config()
const { response } = require('express');
const  Web3 = require('web3');
const contract_data = require("../../build/contracts/base.json");

const localhost = process.env.localhost;
const web3 = new Web3(localhost);
const provider = new Web3.providers.HttpProvider(localhost);

const contract_address = process.env.contract_address
const base = contract(contract_data);
base.setProvider(provider);

let walletAddress;

const owner = process.env.OWNER;

console.log('owner :',owner);

// registers the usr 
const signUp = async(req,res) => {
    walletAddress = req.body.walletAddress;
    console.log("walletAddress " , walletAddress);
    const category = req.body.selectedOption;
    console.log(category);
    try{
        const instance = await base.at(contract_address);
        await instance.addClient(walletAddress,category,{from:owner});
        res.send("Successfully Registered"); 
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}

const logIn = async(req,res)=>{
    walletAddress = req.body.walletAddress;
    console.log(walletAddress);
    const category = req.body.selectedOption;
    console.log(category);
    try{
        const instance = await base.at(contract_address);
        var flag = false;
        if(category === 'lab')
            flag = await instance.isLab(walletAddress,{from:owner});
        if(category === 'patient')
            flag = await instance.isPatient(walletAddress,{from:owner});
        if(category === 'hospital')
            flag = await instance.isHospital(walletAddress,{from:owner});
        (flag)?res.send("ok"):res.send("invalid_request");
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}

module.exports = {
    signUp,
    logIn
}