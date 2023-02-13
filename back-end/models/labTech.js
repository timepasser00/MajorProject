const mongoose=require('mongoose');

const LabTechSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{

        type:String,
        required:true,
    },
    yearOfExperience:{
        type:Number,
        required:true,
    },
    qualification:String,
    walletAddress:{
        type:String,
        // required:true,
        // unique:[true,"Wallet Address already exists"],
    },
    lab:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lab',
    },
    approvedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
    }],
});

const LabTech=mongoose.model('LabTech',LabTechSchema);
module.exports=LabTech;