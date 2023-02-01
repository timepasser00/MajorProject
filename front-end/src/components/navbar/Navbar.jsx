// Navbar.js
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
     <a><Link to="/login">Register/login</Link></a>
      <a><Link to="/appointment">Appointment</Link></a>
      <a><Link to="/hospitals">Hospitals</Link></a>
      
      {/* <a href="/hospitals"></a> */}
    </nav>
  );
};

export default Navbar;
