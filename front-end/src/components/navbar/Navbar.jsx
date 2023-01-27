// Navbar.js
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
     <a><Link to="/login">Register/login</Link></a>
      
      <a href="/hospitals">Hospitals</a>
    </nav>
  );
};

export default Navbar;
