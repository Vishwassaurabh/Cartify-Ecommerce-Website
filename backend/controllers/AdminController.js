const User = require("../model/User");
const Product = require("../model/Product");
const Order = require("../model/Order");

const getAdminDashboard = async (req, res) => {
  try {
    // TOTAL USERS

    const totalUsers = await User.countDocuments();

    // TOTAL PRODUCTS

    const totalProducts = await Product.countDocuments();

    // TOTAL ORDERS

    const totalOrders = await Order.countDocuments();

    // ALL ORDERS

    const orders = await Order.find();

    // TOTAL REVENUE

    const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

    // RECENT ORDERS

    const recentOrders = await Order.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .limit(5);

    // RECENT USERS

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    // LOW STOCK PRODUCTS

    const lowStockProducts = await Product.find({
      stock: {
        $lt: 5,
      },
    });

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      recentUsers,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
};
