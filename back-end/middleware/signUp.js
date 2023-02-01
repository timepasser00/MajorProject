const  contract = require('@truffle/contract');
const contract_data = require("../../build/contracts/base.json");
const  Web3 = require('web3');
const localhost = process.env.localhost;

const web3 = new Web3(localhost)
const provider = new Web3.providers.HttpProvider(localhost);
const owner = process.env.OWNER;


const contract_address = process.env.contract_address
const base = contract(contract_data);
base.setProvider(provider);

const checkSignUp = async (req, res, next) => {
    const {walletAddress} = req.body;
    console.log("walletAddress",walletAddress);
    const category = "patient"


    try {
        const instance = await base.at(contract_address);
        await instance.addClient(walletAddress,category,{from:owner});
        // res.send("Successfully Registered"); 
        next();
    }catch(error){
        // res.send("Invalid Request");
        return res.status(401).json({error:"Invalid Request"})

        // throw new Error("Invalid Request");
        // console.log("This is error message : " + error);

    }
  
}
module.exports = {
    checkSignUp
}