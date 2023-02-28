const mongoose=require("mongoose");
const InsuranceCompanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true     
    },
    contact:{
        type:String,
        required:true,
        // unique:true
    },
    approvedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
]
   
},{timestamps:true});

module.exports=mongoose.model("InsuranceCompany",InsuranceCompanySchema);

