import React, { useState } from 'react';
import Options from '../components/Options'
const RegistrationForm = (props) => {
  
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
  
  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

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
  const handleSignUp = async(event) => {
    event.preventDefault();
    // if(window.ethereum){
    //     console.log("handling submit")
    //     try{
    //       const curr_accounts = await window.ethereum.request({
    //         method: "eth_requestAccounts",
    //       });
          
    //       await Promise.resolve(curr_accounts);
    //       const data = {curr_accounts,selectedOption};
    //       const response = await fetch('http://localhost:3001/home/'+`props.data`, {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {  
    //           'Content-Type': 'application/json'
    //         }
    //       })
          // console.log("curr_wallet_address: " + curr_accounts[0]);
    //       const msg = await response.text();
    //       console.log(msg);
    //       alert(msg);
          
    //     }catch(error){
    //       console.log("Error connecting ..");
    //     }
    //   }else{
    //     console.log('not detected');
    //   } 
  };

  return (
    <>
      <h1>Health Block</h1>
      <form style={formStyles}>
        <h3>Sign Up  Options:</h3>
        <Options style = {radioStyles1} />
        <button type="submit" onClick={handleSignUp}>SignUp</button>
        <h3>Log In Options:</h3>
        <Options style = {radioStyles2} />
        <button type="submit">Log In </button>
      </form>
    </>
  );
};

export default RegistrationForm;
