const express = require("express");

const {
  registerUser,
  loginUser,
  logout,
  checkAuth,
  getProfile,
} = require("../controllers/AuthControllers");
const isAuth = require("../middlewares/isAuth");

const authRoutes = express.Router();

// Register
authRoutes.post("/api/user/register", registerUser);

// Login
authRoutes.post("/api/user/login", loginUser);

// Logout
authRoutes.post("/api/user/logout", logout);

authRoutes.get("/api/user/auth/check", isAuth, checkAuth);

authRoutes.get("/api/profile", isAuth, getProfile);

module.exports = authRoutes;
