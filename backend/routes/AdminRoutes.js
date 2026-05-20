const express = require("express");

const { getAdminDashboard } = require("../controllers/AdminControllers");

const isAuth = require("../middlewares/isAuth");

const isAdmin = require("../middlewares/isAdmin");

const adminRoutes = express.Router();

// DASHBOARD

adminRoutes.get("/api/admin/dashboard", isAuth, isAdmin, getAdminDashboard);

module.exports = adminRoutes;
