import React, { useState } from "react";
import "./PrivateNavbar.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/userAPI";
import { useAuth } from "../../AuthContext/AuthContext";

const PrivateNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  /* NAVIGATE */
  const navigate = useNavigate();

  /* AUTH */
  const { logout } = useAuth();

  /* MUTATION */
  const mutation = useMutation({
    mutationFn: logoutAPI,
  });

  /* LOGOUT */
  const handleLogout = () => {
    mutation.mutate();

    logout();

    /* CLEAR STORAGE */
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    /* NAVIGATE LOGIN */
    navigate("/login");
  };

  return (
    <nav className="logged-navbar">
      {/* LOGO */}

      <div className="logo">
        <h1>
          Cart<span>ify</span>
        </h1>
      </div>

      {/* LINKS */}

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>

        <a href="/products">Products</a>

        <a href="/cart">Cart 🛒</a>

        <a href="/orders">Order</a>

        <a href="/profile">Profile</a>

        <button className="logout-btn" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* HAMBURGER */}

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
