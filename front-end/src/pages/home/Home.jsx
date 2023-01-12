import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import PartnersSection from '../../components/partnerSection/PartnerSection'
import SearchSection from '../../components/searchSection/SearchSection'
import './home.css'


const Home = () => {
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