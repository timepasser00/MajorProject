const contract = require("@truffle/contract");
const { response } = require("express");
const Web3 = require("web3");
const contract_data = require("../../build/contracts/base.json");
const localhost = process.env.localhost;
const web3 = new Web3(localhost);
const provider = new Web3.providers.HttpProvider(localhost);
const contract_address = process.env.contract_address;
const base = contract(contract_data);
require("dotenv").config();
base.setProvider(provider);



// const {create} = require('ipfs-http-client');

// const client = create(new URL('http://127.0.0.1:5002'))

const owner = process.env.OWNER;

const getInstance = async (req, res) => {
  try {
    const instance = await base.at(contract_address);
    return instance;
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  getInstance,
};
