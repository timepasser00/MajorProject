import React, { useState } from 'react';
import { useEffect } from 'react';
import Options from '../components/Options'
const RegistrationForm = (props) => {
  const [walletAddress,setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const formStyles = {
    width: '400px',
    height: '400px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#eee',
    padding: '20px',
    border: '1px solid #333'
    
  };
  
  useEffect(()=>{
    // e.preventDefault();
    const metaCheck =  async()=>{
      if(window.ethereum){
        console.log("metaCheck")
        try{
          const curr_accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          
          await Promise.resolve(curr_accounts);
          await setWalletAddress(curr_accounts[0])
          // await console.log("walletAddress :: " , walletAddress);
        }catch(error){
          console.log("Error connecting ..");
        }
      }else{
        console.log('not detected');
      }
    }
    metaCheck();
  }, []);

  const radioStyles1 = {
    position: 'absolute',
    width: 'auto',
    padding: '2px',
    left : '40%'
  };
  const radioStyles2 = {
    position: 'absolute',
    width: 'auto',
    padding: '2px',
    left : '40%'
  };

  function handleOptionChange(x){
    setSelectedOption(x);
  }
  
  const handleRequest = async(func) => {
    console.log(walletAddress);
    console.log(selectedOption);
    const data = {walletAddress,selectedOption};
    const url = 'http://localhost:3001/home/'+func;
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  
        'Content-Type': 'application/json'
      }
    })
    // console.log("curr_wallet_address: " + curr_accounts[0]);
    const msg = await response.text();
    console.log(msg);
    alert(msg);      
  };

  return (
    <>
      <h1>Health Block</h1>
      <form style={formStyles}>
        <h3>Sign Up  Options:</h3>
        <Options style = {radioStyles1} handleOptionChange={handleOptionChange}  />
        <button type="submit" onClick={(e)=> {
          e.preventDefault()
          handleRequest("signUp")}}>SignUp</button>
        <h3>Log In Options:</h3>
        <Options style = {radioStyles2} option ={selectedOption} handleOptionChange ={setSelectedOption}/>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
          handleRequest("logIn")}}>Log In </button>
      </form>
    </>
  );
};

export default RegistrationForm;
