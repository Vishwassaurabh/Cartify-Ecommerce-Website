import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 className=".navbar-logo">
          Cart<span>ify</span>
        </h1>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart🛒</a>
        <a href="/about">About Us</a>
        <a href="/register">SignUp</a>
        <a href="/login">Login</a>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
