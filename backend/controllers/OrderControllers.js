const Order = require("../model/Order");
const Product = require("../model/Product");
const Cart = require("../model/Cart");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // Validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    let itemsPrice = 0;

    const updatedOrderItems = [];

    // Validate products
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      // Product not found
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} out of stock`,
        });
      }

      // Calculate subtotal
      itemsPrice += product.price * item.quantity;

      updatedOrderItems.push({
        product: product._id,

        title: product.title,

        image: product.image,

        quantity: item.quantity,

        price: product.price,
      });
    }

    // Shipping
    const shippingPrice = itemsPrice > 1000 ? 0 : 100;

    // Tax
    const taxPrice = Number((itemsPrice * 0.18).toFixed(2));

    // Total
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Create order
    const order = await Order.create({
      user: req.user.id,

      orderItems: updatedOrderItems,

      shippingAddress,

      paymentMethod,

      itemsPrice,

      shippingPrice,

      taxPrice,

      totalPrice,
    });

    // Update stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      product.stock -= item.quantity;

      await product.save();
    }

    // Clear cart
    await Cart.findOneAndDelete({
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",

      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("orderItems.product", "title image price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("orderItems.product", "title image price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = req.body.orderStatus || order.orderStatus;

    // Delivered logic
    if (req.body.orderStatus === "Delivered") {
      order.isDelivered = true;

      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",

      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Payment updated",

      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Prevent delivered cancel
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }

    // Restore stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stock += item.quantity;

        await product.save();
      }
    }

    order.orderStatus = "Cancelled";

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",

      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
};
