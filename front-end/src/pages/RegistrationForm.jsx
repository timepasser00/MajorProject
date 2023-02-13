import React, { useState } from 'react';
import { useEffect } from 'react';
import Options from '../components/Options'
import { useDispatch, useSelector } from 'react-redux';
import { assignWalletAddress } from '../redux/actions/patientActions';
import PatientDetails from './PatientDetails';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const RegistrationForm = (props) => {
  const [walletAddress,setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [id, setId] = useState("");
  const tempwallet=useSelector((state)=>state.walletAddress)
const dispatch = useDispatch();

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
console.log("Im in registration form")
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
          setWalletAddress(curr_accounts[0])
          console.log("walletAddress :: " , walletAddress);
          // dispatch({type: "SET_WALLET_ADDRESS", payload: walletAddress});
          dispatch(assignWalletAddress(walletAddress));
          console.log("tempwallet :: " , tempwallet);
        }catch(error){
          console.log("Error connecting ..");
        }
      }else{
        console.log('not detected');
      }
    }
    metaCheck();

  }, [walletAddress,dispatch,tempwallet]);

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
  const navigate = useNavigate();
  const navigateToDetails = () => {
    
    if(selectedOption === "patient"){
      navigate('/patientDetails');
    }else if(selectedOption === "insuranceCompany"){
      navigate('/insuranceCompanyDetailsForm');
    }
    else{
      navigate('/requestForm',{state: { data : selectedOption}});
    }
    
  }
  const handleRequest = async(func) => {
    // console.log(walletAddress);
    // console.log(selectedOption);
    // const data = {walletAddress,selectedOption};
    // const url = 'http://localhost:3001/home/'+func;
    // console.log(url);
    // const response = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {  
    //     'Content-Type': 'application/json'
    //   }
    // })
    // if(func === "signUp"){
    //   const msg = await response.text();
    //   console.log(msg);
    //   alert(msg); 
    // }else{
    //   const msg = await response.text();
    //   console.log(msg);
    //   alert(msg); 
    // }
    // const data={walletAddress,selectedOption};
    // const response = await fetch('http://localhost:3001/home/login', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // const msg =  (await response.text()).toString();
    // navigate(`/patient/${msg}`);
    // console.log(msg);
    // alert(msg);
    try{
    fetch('http://localhost:3001/home/logIn', {
      method: 'POST',
      body: JSON.stringify({walletAddress,selectedOption}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( res => {
      if(res.status === 200){
        return res.json();
      }
      else{
        throw new Error("No such user exists");
      }
     } )
    .then(data => {
    setId(data);
      console.log(data,"id from registration form");
    
        navigate(`/${data.category}/${data.id}`);
      
    }).catch(err => {
      alert("No such user exists2");
    })

    }catch(err){

        alert("No such user exists3");
      }

     
      


         
  };

  return (
    <>
    <div className='register-app'>
      <h1>Health Block</h1>
      <form style={formStyles}>
        <h3>Sign Up  Options:</h3>
        <Options style = {radioStyles1} handleOptionChange={handleOptionChange}  />
        <button type="submit" onClick={(e)=> {
          e.preventDefault()
          navigateToDetails()}}>SignUp</button>
        <h3>Log In Options:</h3>
        {/* <h3>{walletAddress}</h3> */}
        <Options style = {radioStyles2} option ={selectedOption} handleOptionChange ={setSelectedOption} type="login"/>
        <button type="submit" onClick={(e)=>{
          e.preventDefault()
          handleRequest("logIn")}}>Log In </button>
      </form>   
      <Link to="/requestForm">Join</Link>
      </div>
      {/* <h1>{id}</h1> */}
    </>
  );
};

export default RegistrationForm;
