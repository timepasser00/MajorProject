const Hospital = require('../models/hospital');
const Request = require('../models/request');

const registerRequest = async (req, res) => {
    console.log(req.body);
    const{type,name,contact}=req.body;
    try{
        
        const request= await Request.create({type,name,contact});
        res.status(200).json({request});
    }catch(err){
        res.status(400).json({err:err.message});
    }

}
const allRequests = async (req, res) => {
    try {
        const requests= await Request.find();
        res.send(requests)
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}



module.exports={
    registerRequest,
    allRequests
}