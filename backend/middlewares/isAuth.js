const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // 1. Check Bearer Token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Check Cookie Token
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // No Token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, no token",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find User
    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save User
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuthenticated;
