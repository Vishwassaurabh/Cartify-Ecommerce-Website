const Category = require("../model/Category");


// Create Category (Admin)
const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    // Check existing category
    const categoryExists =
      await Category.findOne({
        name,
      });

    if (categoryExists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    // Create category
    const category =
      await Category.create({
        name,
        parent: parent || null,
      });

    res.status(201).json({
      message:
        "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Categories
const getCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find()
        .populate("parent", "name")
        .sort({ createdAt: -1 });

    res.status(200).json({
      total: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Single Category
const getCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      ).populate("parent", "name");

    // Check category
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Category (Admin)
const updateCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    // Check category
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Update
    const updatedCategory =
      await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );

    res.status(200).json({
      message:
        "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Category (Admin)
const deleteCategory = async (
  req,
  res
) => {
  try {
    const category =
      await Category.findById(
        req.params.id
      );

    // Check category
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Delete
    await Category.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

