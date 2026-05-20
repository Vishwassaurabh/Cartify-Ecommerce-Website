import React from "react";
import "./Profile.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "../../../AuthContext/AuthContext";
import toast from "react-hot-toast";
import Footer from "./../../Footer/Footer";

/* ================= FETCH PROFILE ================= */

const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
};

const Profile = () => {
  const navigate = useNavigate();
  
  const { logout } = useAuth();
  /* ================= PROFILE QUERY ================= */

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    /* CLEAR STORAGE */
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    /* UPDATE AUTH STATE */
    logout();

    /* TOAST */
    toast.success("Logout Successful");

    /* REDIRECT */
    navigate("/login");
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner"></div>

        <p>Loading Profile...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return <h1 className="profile-error">{error.message}</h1>;
  }

  return (
    <>
      <section className="profile-page">
        <div className="profile-card">
          {/* IMAGE */}

          <div className="profile-image">
            <img src="https://i.pravatar.cc/300" alt="profile" />
          </div>

          {/* INFO */}

          <div className="profile-info">
            <h1>{user?.username}</h1>

            <p className="profile-role">{user?.role}</p>

            {/* DETAILS */}

            <div className="profile-details">
              <div className="profile-item">
                <User size={20} />

                <span>{user?.username}</span>
              </div>

              <div className="profile-item">
                <Mail size={20} />

                <span>{user?.email}</span>
              </div>

              <div className="profile-item">
                <ShieldCheck size={20} />

                <span>{user?.role}</span>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="profile-buttons">
              <button
                className="orders-btn"
                onClick={() => navigate("/orders")}
              >
                <ShoppingBag size={18} />
                My Orders
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
