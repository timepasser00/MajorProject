const EmployeeRequest=require('../models/employeeRequest');
const Cryptr=require("cryptr");
const cryptr=new Cryptr(process.env.CRYPTR_SECRET);
const Lab=require("../models/lab");
const LabTech=require("../models/labTech");


const registrationRequest=async(req,res)=>{
    const {firstName,lastName,yearOfExperience,qualification,labId,walletAddress}=req.body;
    
    const encryptedWalletAddress=cryptr.encrypt(walletAddress);
    console.log(firstName,lastName,yearOfExperience,qualification,labId,encryptedWalletAddress);
    try{
        const employeeRequest=await EmployeeRequest.create({firstName,lastName,yearOfExperience,qualification,labId,walletAddress:encryptedWalletAddress,employeeType:"labTech"});
        res.status(200).json({employeeRequest});
    }catch(err){
        res.status(400).json({err:err.message});
    }
    }

    const getAllPatients= async (req,res) =>{

        const {walletAddress}=req.params;
        console.log(walletAddress,"walletAddress from labTechController")
        try{
            const instance = await require("../exports/instanceExport").getInstance();
            const labTechId=await instance.getId(walletAddress);
            console.log(labTechId,"labTechId from labTechController")
            
            const labTech=await LabTech.findById(labTechId).populate("approvedBy");
            const patients=labTech.approvedBy;
            console.log(labTech,"labTech from labTechController")
            res.status(200).json({patients});
            
            // const patients=lab.patients;

        }catch(err){
            res.status(400).json({err:err.message});
        }
    }
    module.exports={registrationRequest,getAllPatients}