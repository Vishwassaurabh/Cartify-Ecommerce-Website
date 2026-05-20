import React, { useState, useEffect } from "react";

import "./Login.css";

import { useMutation } from "@tanstack/react-query";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../../AuthContext/AuthContext";

import { loginAPI } from "../../../apis/user/userAPI";

const Login = () => {
  // States
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Auth Context
  const { isAuthenticated, login } = useAuth();

  // Navigate
  const navigate = useNavigate();

  // Redirect Logged User
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginAPI,

    onSuccess: (data) => {
      console.log(data);

      // SAVE TOKEN

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        }),
      );

      // Success Message

      setSuccessMessage("Login Successful");

      // Clear Error

      setErrorMessage("");

      // Update Auth State

      login();

      // Clear Fields

      setEmail("");
      setPassword("");

      // Redirect

      setTimeout(() => {
        navigate("/");
      }, 1500);
    },

    onError: (error) => {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Login Failed");

      setSuccessMessage("");
    },
  });

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      return setErrorMessage("All fields are required");
    }

    // Clear Error
    setErrorMessage("");

    // API Call
    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        {/* Heading */}
        <h2>Welcome Back</h2>

        <p className="login-subtitle">Login to your Cartify account</p>

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label className="label-login">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-login"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="label-login">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-login"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="register-link-text">
          Don't have an account?
          <Link to="/register" className="register-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
