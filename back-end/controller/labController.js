const EmployeeRequest=require ("../models/employeeRequest");
const Cryptr=require("cryptr");
const cryptr=new Cryptr(process.env.CRYPTR_SECRET);
const Lab=require("../models/lab");
const LabTech=require("../models/labTech");

const allRequests=async(req,res)=>{
    const id=req.params.id;
    console.log(id," id");

try{
    const employeeRequest= await EmployeeRequest.find({labId:id});
    res.status(200).json({employeeRequest});
}catch(err){
    res.status(400).json({err:err.message});
}
}
const getAllLabs=async(req,res)=>{
    try{
        const labs=await Lab.find();
        res.status(200).json({labs}); 
    }catch(err){
        res.status(400).json({err:err.message});
    }
}
const registerLabTech=async(req,res)=>{
    const id=req.params.id;
    console.log(id,"id from register lab tech");
    let labTechId="";
    try{
        const employeeRequest=await EmployeeRequest.findById(id);
        const {empWalletAddress}=req.body
        console.log(empWalletAddress,"lab address");
        const {firstName,lastName,yearOfExperience,qualification,labId,walletAddress}=employeeRequest;
        console.log(walletAddress,"address to approve after encrypt")
        const decryptedWalletAddress = cryptr.decrypt(walletAddress);
        const lab=await Lab.findById(labId);
        console.log(decryptedWalletAddress,"address to approve after decrypt" );
        const labTech=await LabTech.create({firstName,lastName,yearOfExperience,qualification,lab:labId});
        labTechId=labTech._id;
        const empId=(labTech._id).toString();
        console.log(empId,"emp id");
        const instance=await require("../exports/instanceExport").getInstance();
        await instance.addEmplyoee(decryptedWalletAddress,empId,{from:empWalletAddress});
        lab.labTechs.push(labTechId);
        lab.save();
        console.log(lab,"");

        res.status(200).json({labTech});
    }catch(err){
        if(labTechId!==""){
            const labTech=await LabTech.findByIdAndDelete(labTechId);
        }
        res.status(400).json({err:err.message});
    }






        
}
const getAllLabTechs=async(req,res)=>{
    const id=req.params.id;
    try{
   const lab=await Lab.findById(id).populate("labTechs");
   const labTechs=lab.labTechs;
     res.status(200).json({labTechs});
    }catch(err){
        res.status(400).json({err:err.message});
    }
    


}

module.exports={allRequests,getAllLabs,registerLabTech,getAllLabTechs}
