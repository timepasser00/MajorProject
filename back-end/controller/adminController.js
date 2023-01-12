const Hospital= require('../models/hospital');
const Request= require('../models/request');
const Lab= require('../models/lab');

const approveRequest=async (req,res)=>{
    const id=req.params.id;
    console.log(req.params.id)
    try{
        const request=await Request.findById(id);
        console.log(request);
        const {type,name,contact}=request;
        if(type==="hospital"){
            const hospital=await Hospital.create({type,name,contact});
            res.status(200).json({hospital});
        }
        else if(type==="lab"){
            const lab=await Lab.create({type,name,contact});
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
