import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import PartnersSection from '../../components/partnerSection/PartnerSection'
import SearchSection from '../../components/searchSection/SearchSection'
import './home.css'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {assignWalletAddress} from '../../redux/actions/patientActions';


const Home = () => {
  const [walletAddress,setWalletAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [id, setId] = useState("");
  const tempwallet=useSelector((state)=>state.walletAddress)
const dispatch = useDispatch();


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
  return (
    <div>
        <Navbar/>
        <SearchSection/>
        <PartnersSection/>
        <Footer/>
    </div>
  )
}

export default Home