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
const [userType, setUserType] = useState("");



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
          let twallet=await curr_accounts[0];
          setWalletAddress(curr_accounts[0])
          console.log("walletAddress :: " , walletAddress);
          // dispatch({type: "SET_WALLET_ADDRESS", payload: walletAddress});
          // dispatch(assignWalletAddress(walletAddress));
          // const Info = {
          //   walletAddress: walletAddress,
          //  category: "Patient"
          // }

          // dispatch(assignWalletAddress(Info));
          console.log("twallet :: " , twallet);
          fetchUserType(twallet);
        }catch(error){
          console.log("Error connecting ..");
        }
      }else{
        console.log('not detected');
      }
    }
    metaCheck();


    

    const fetchUserType = async (twallet) => {

    fetch(`http://localhost:3001/home/findUserType`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            walletAddress: twallet,
        }),
    })
    .then((res) =>
    {
        if(res.status === 200){
            return res.json()
        }
        else if(res.status === 404){
            alert(" error here1")
        }
    })
    .then((data) => {
        console.log(data, "data");
        setUserType(data.category);
        const Info = {

            walletAddress: twallet,
            category: data.category
        }
        dispatch(assignWalletAddress(Info));

        // setInsuranceCompanyList(data.insuranceCompany);
    });

  }

  }, []);
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