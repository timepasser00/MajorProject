const Hospital= require('../models/hospital');
const Request= require('../models/request');
const Lab= require('../models/lab');
const Address=require('../models/address');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
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
const owner = process.env.OWNER;
const approveRequest=async (req,res)=>{
    const id=req.params.id;
    console.log(req.params.id)
    let orgType="";
    let orgId="";
    try{
        const request=await Request.findById(id);
        console.log(request,"request to approve");
        const {type,name,contact,address,specialities,walletAddress}=request;
        console.log((walletAddress),"address to approve before decrypt");

       const  decryptedWalletAddress=cryptr.decrypt(walletAddress);
        console.log((decryptedWalletAddress),"address to approve after encrypt" );
        // console.log((address),"address to approve")
       
        if(type==="hospital"){
            orgType="hospital";
            const hospital=await Hospital.create({name,contact,
                address:address,
                specialities:[...specialities]});
                orgId=(hospital._id).toString();
                
                const category=1;
                const instance =await base.at(contract_address);
                console.log("orgId",orgId);
                await instance.addClient(decryptedWalletAddress,category,orgId,{from:owner});
                console.log(hospital,"hospital to approve")
            res.status(200).json({hospital});
        }
        else if(type==="lab"){
            orgType="lab";
            const lab=await Lab.create({name,contact,
                address:address
                
                ,specialities:[...specialities]});
                orgId=(lab._id).toString();
                const category=2;
                const instance =await base.at(contract_address);
                await instance.addClient(decryptedWalletAddress,category,orgId,{from:owner});
                console.log(lab,"lab to approve")

            res.status(200).json({lab});
        }
       
    }catch(err){
        if(orgType==="hospital" && orgId!==""){
            const hospital=await Hospital.findByIdAndDelete(orgId);
        }
        else if(orgType==="lab" && orgId!==""){
            const lab=await Lab.findByIdAndDelete(orgId);

        }
        res.status(400).json({err:err.message});
    }
       
}
const deleteRequest=async (req,res)=>{
    const id=req.params.id;
    try{
        const request=await Request.findByIdAndDelete(id);
        res.status(200).json({request});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}

module.exports={
    approveRequest,
    deleteRequest 
}
