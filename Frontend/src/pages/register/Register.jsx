import React, { useState, useEffect } from "react";
import "./Register.css";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../apis/user/userAPI";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //custom auth hook
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  //Redirect if a user is login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: registerAPI,

    onSuccess: (data) => {
      console.log(data);

      setSuccessMessage("Registration Successful");

      setErrorMessage("");

      // Clear Fields
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect Login Page
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },

    onError: (error) => {
      console.log(error);

      setErrorMessage(error.response?.data?.message || "Registration Failed");

      setSuccessMessage("");
    },
  });

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!username || !email || !password) {
      return setErrorMessage("All fields are required");
    }

    registerMutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Sign Up </h1>

        {/* Success Message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="register-label">Your Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter a Username"
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />
          </div>

          <div>
            <label className="register-label">Your Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter a Email"
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
            />
          </div>

          <div>
            <label className="register-label">Your Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter a Password"
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
          </div>

          <button className="signUp-button">
            {" "}
            {registerMutation.isPending ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="login-link-text">
          Already have an account?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
