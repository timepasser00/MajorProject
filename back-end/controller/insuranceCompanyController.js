const InsuranceCompany=require('../models/insuranceCompany');
const owner=process.env.OWNER;
const registerInsuranceCompany=async(req,res)=>{
    const {name,contact,walletAddress}=req.body;
    console.log(name,contact,walletAddress);
    let insId="";
    try{
        const insuranceCompany=await InsuranceCompany.create({name,contact});
        insId=insuranceCompany._id;
        const _id=(insuranceCompany._id).toString();
        const category=3;

        const instance=await require("../exports/instanceExport").getInstance();
        await instance.addClient(walletAddress,category,_id,{from :owner});
     
        res.status(200).json({insuranceCompany});
    }catch(err){
    if(insId!==""){
        await InsuranceCompany.findByIdAndDelete(insId);
    }
        res.status(400).json({err:err.message});
    }
}
const getAllInsuranceCompanies=async(req,res)=>{
    try{
    const insuranceCompany=await InsuranceCompany.find();
    res.status(200).json({insuranceCompany});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}
const getAllPatientsRequests=async(req,res)=>{
    const id=req.params.id;
    try{    
        const insuranceCompany=await InsuranceCompany.findById(id).populate("approvedBy");
        const patient=insuranceCompany.approvedBy;
        res.status(200).json({patient});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}


module.exports = {
registerInsuranceCompany,
getAllInsuranceCompanies,
getAllPatientsRequests
}