const Cart = require("../model/Cart");
const Product = require("../model/Product");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Quantity validation
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Product exists
    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Stock check
    if (quantity > existingProduct.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // Find cart
    let cart = await Cart.findOne({
      user: req.user.id,
    });

    // Create cart
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,

        items: [
          {
            product,
            quantity,
          },
        ],
      });
    } else {
      // Product exists?
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product,
      );

      // Update quantity
      if (itemIndex > -1) {
        const newQuantity = cart.items[itemIndex].quantity + quantity;

        // Stock validation
        if (newQuantity > existingProduct.stock) {
          return res.status(400).json({
            success: false,
            message: "Stock limit exceeded",
          });
        }

        cart.items[itemIndex].quantity = newQuantity;
      } else {
        // Add item
        cart.items.push({
          product,
          quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product", "title image price stock");

    // Empty cart

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
        totalItems: 0,
        totalPrice: 0,
      });
    }

    // Remove deleted products

    cart.items = cart.items.filter((item) => item.product);

    // Total Items

    const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    // Total Price

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    res.status(200).json({
      success: true,
      cart,
      totalItems,
      totalPrice,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cart Item
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    // Validation
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check stock
    const product = await Product.findById(item.product);

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Stock limit exceeded",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
