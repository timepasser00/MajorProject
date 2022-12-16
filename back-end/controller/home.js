const  contract = require('@truffle/contract');
const { response } = require('express');
const  Web3 = require('web3');
const contract_data = require("../../build/contracts/base.json");

const localhost = "http://127.0.0.1:8545";
const web3 = new Web3(localhost);
const provider = new Web3.providers.HttpProvider(localhost);

const contract_address = '0x5D08AFb15725771735f94282b894a1Dec06aEF1f'
const base = contract(contract_data);
base.setProvider(provider);

let walletAddress;

const owner = '0xB6389Ab754A16808FcaBAaA3DdCcFE68A0Eb9648'


// registers the usr 
const signUp = async(req,res) => {
    walletAddress = req.body.curr_accounts;
    console.log(walletAddress);
    const category = req.body.selectedOption;
    console.log(category);
    try{
        const instance = await base.at(contract_address);
        await instance.addClient(walletAddress,category,{from:owner});
        res.send("Successfully Registered"); 
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}

const logIn = async(req,res)=>{
    walletAddress = req.body.curr_accounts;
    console.log(walletAddress);
    const category = req.body.selectedOption;
    console.log(category);
    try{
        const instance = await base.at(contract_address);
        await instance.addClient(walletAddress,category,{from:owner});
        res.send("Successfully Registered"); 
    }catch(error){
        res.send("Invalid Request");
        console.log("This is error message : " + error);
    }
}

module.exports = {
    signUp,
    logIn
}