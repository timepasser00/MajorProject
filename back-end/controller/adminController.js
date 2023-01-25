const Hospital= require('../models/hospital');
const Request= require('../models/request');
const Lab= require('../models/lab');
const Address=require('../models/address');

const approveRequest=async (req,res)=>{
    const id=req.params.id;
    console.log(req.params.id)
    try{
        const request=await Request.findById(id);
        console.log(request,"request to approve");
        const {type,name,contact,address,specialities,walletAddress}=request;
        console.log((address),"address to approve")
       
        if(type==="hospital"){
            const hospital=await Hospital.create({name,contact,
                address:address,
                walletAddress
                ,specialities:[...specialities]});
                cosole.log(hospital,"hospital to approve")
            res.status(200).json({hospital});
        }
        else if(type==="lab"){
            const lab=await Lab.create({name,contact,
                address:address
                ,walletAddress
                ,specialities:[...specialities]});
            res.status(200).json({lab});
        }
       
    }catch(err){
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
