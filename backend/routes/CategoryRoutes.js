const express = require("express");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

const isAuth = require("../middlewares/isAuth");

const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Public Routes
router.get("/api/categories", getCategories);

router.get("/api/categories/:id", getCategory);

// Admin Routes
router.post("/api/categories/create", isAuth, isAdmin, createCategory);

router.put("/api/categories/update/:id", isAuth, isAdmin, updateCategory);

router.delete("/api/categories/delete/:id", isAuth, isAdmin, deleteCategory);

module.exports = router;
