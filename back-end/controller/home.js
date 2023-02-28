const  contract = require('@truffle/contract');
require("dotenv").config();
const { getInstance } = require("../exports/instanceExport");
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



// registers the usr
const signUp = async (req, res) => {
  walletAddress = req.body.walletAddress;
  console.log("walletAddress ", walletAddress);
  const category = req.body.selectedOption;
  console.log(category);
  try {
    const instance = await base.at(contract_address);
    // const instance = await getInstance();
    await instance.addClient(walletAddress, category, { from: owner });
    res.send("Successfully Registered");
  } catch (error) {
    res.send("Invalid Request");
    console.log("This is error message : " + error);
  }
};

const logIn = async (req, res) => {
  walletAddress = req.body.walletAddress;
  let _id="";
  console.log(walletAddress);
  const category = req.body.selectedOption;
  console.log(category);
  try {
    // const instance = await base.at(contract_address);
    const instance = await getInstance();
    var flag = false;
    if (category === "lab"){
        flag = await instance.isLab(walletAddress, { from: owner });
        console.log("flag : ", flag);
        try{
             _id = await instance.getId(walletAddress, { from: owner });
            
            console.log("lab id : ", _id);
        }
        catch(err){
            console.log("error : ", err);
        }
    }
      
    if (category === "patient"){
      flag = await instance.isPatient(walletAddress, { from: owner });
       _id = await instance.getId(walletAddress, { from: owner });
        console.log("patient id : ", _id);
    }
    if (category === "hospital"){
       
      flag = await instance.isHospital(walletAddress, { from: owner });
         _id = await instance.getId(walletAddress, { from: owner })
         console.log("hospital  test");
         console.log(flag,"flag");
    }
    if (category === "insuranceCompany"){
      flag = await instance.isInsuranceCompany(walletAddress, { from: owner });
         _id = await instance.getId(walletAddress, { from: owner });
         console.log("insuranceCompany id : ", _id, "flag : ", flag);
    }
    if (category === "doctor"){
      flag = await instance.isDoctor(walletAddress, { from: owner });
          _id = await instance.getId(walletAddress, { from: owner });
          console.log("doctor id : ", _id);
    }
    if(category==="labTech"){
        flag = await instance.isLabTech(walletAddress, { from: owner });
        _id = await instance.getId(walletAddress, { from: owner });
        console.log("labTech id : ", _id);
    }
    // flag ? res.send(_id) : res.send("invalid_request");
    if(flag){
        res.status(200).json({
            id : _id,
            category : category,
        });
    }
    else{
        res.status(404).json({
            message : "Invalid Request",
        });
    }
  } catch (error) {
    console.log("This is error message : " + error);
    res.status(404).json({
        message : "Invalid Request",
    });
  }
};

const findUserType=async(req,res)=>{
    const walletAddress = req.body.walletAddress;
    console.log((walletAddress).toLowerCase() ,"from findUserType");
    let category="";
    try{
      console.log("owner :",(owner).toLowerCase());
    
        const instance = await getInstance();
        const flag = await instance.isParticipant(walletAddress, { from: owner });
        console.log("flag : ", flag);
        if(flag){
          const isLab=await instance.isLab(walletAddress, { from: owner });
          if(isLab){
            category="lab";
          }
          const isPatient=await instance.isPatient(walletAddress, { from: owner });
          if(isPatient){
            category="patient";
          }
          const isHospital=await instance.isHospital(walletAddress, { from: owner });
          if(isHospital){
            category="hospital";
          }
          const isInsuranceCompany=await instance.isInsuranceCompany(walletAddress, { from: owner });
          if(isInsuranceCompany){
            category="insuranceCompany";
          }
          const isDoctor=await instance.isDoctor(walletAddress, { from: owner });
          if(isDoctor){
            category="doctor";
          }
          const isLabTech=await instance.isLabTech(walletAddress, { from: owner });
          if(isLabTech){
            category="labTech";
          }
        
          res.status(200).json({
            category : category,
        });
      }  
      
      else if(category===""){
        if(""+((walletAddress).toLowerCase())===(""+(owner).toLowerCase())){
          category="admin";
        }
        res.status(200).json({
          category : category,
      });
      }
      else{

        res.status(404).json({
            message : "Invalid Request",
        });
      }
    }
    catch(err){
        console.log("error : ", err);
        res.status(404).json({

            message : "Invalid Request",
        });

      }



    
       
    }
    const getId=async(req,res)=>{
      const walletAddress = req.params.walletAddress;
      const instance = await require("../exports/instanceExport").getInstance();
      const _id = await instance.getId(walletAddress, { from:walletAddress});
      res.status(200).json({
        id : _id,
    });
    }
      







module.exports = {
  signUp,
  logIn,
  findUserType,
  getId
};
