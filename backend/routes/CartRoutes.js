const express = require("express");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartControllers");

const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Add To Cart
router.post("/api/cart/add", isAuth, addToCart);

// Get Cart
router.get("/api/cart", isAuth, getCart);

// Update Quantity
router.put("/api/cart/update/:itemId", isAuth, updateCartItem);

// Remove Item
router.delete("/api/cart/remove/:itemId", isAuth, removeCartItem);

// Clear Cart
router.delete("/api/cart/clear", isAuth, clearCart);

module.exports = router;
