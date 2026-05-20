const express = require("express");

const {
  CreateProduct,
  GetProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const isAuth = require("../middlewares/isAuth");

const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// Public Routes
router.get("/api/product", GetProducts);

router.get("/api/product/:id", singleProduct);

// Admin Routes
router.post("/api/product/create", isAuth, isAdmin, CreateProduct);

router.put("/api/product/update/:id", isAuth, isAdmin, updateProduct);

router.delete("/api/product/delete/:id", isAuth, isAdmin, deleteProduct);

module.exports = router;
