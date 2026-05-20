const Product = require("../model/Product");

//! create a Product
const CreateProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, stock } = req.body;

    //validation
    if (!title || !description || !price || !image || !category || !stock) {
      res.status(400);
      throw new Error("All field are required");
    }

    // Create Product
    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//! get all products
const GetProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("createdBy", "username");

    res.status(200).json({
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Product
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "username email role",
    );

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product (Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check product
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateProduct,
  GetProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
