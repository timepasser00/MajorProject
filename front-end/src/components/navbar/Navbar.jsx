// Navbar.js
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userType = useSelector((state) => state.category);
  return (
    <nav className="navbar">
     <a><Link to="/login">Register/login</Link></a>
      <a><Link to="/appointment">Appointment</Link></a>
      <a><Link to="/hospitals">Hospitals</Link></a>
     { userType==="admin" && <a><Link to="/admin">Admin</Link></a>}
      
      {/* <a href="/hospitals"></a> */}
    </nav>
  );
};

export default Navbar;
