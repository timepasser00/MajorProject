// Navbar.js
import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">Home</a>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
    </nav>
  );
};

export default Navbar;
