const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
} = require("../controllers/OrderController");

const isAuth = require("../middlewares/isAuth");

const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

// User Routes
router.post("/api/orders/create", isAuth, createOrder);

router.get("/api/my-orders", isAuth, getMyOrders);

router.get("/api/my-orders/:id", isAuth, getOrder);

router.put("/api/orders/cancel/:id", isAuth, cancelOrder);

// Admin Routes
router.get("/api/orders", isAuth, isAdmin, getOrders);

router.put("/api/orders/status/:id", isAuth, isAdmin, updateOrderStatus);

router.put("/api/orders/payment/:id", isAuth, isAdmin, updatePaymentStatus);

module.exports = router;
