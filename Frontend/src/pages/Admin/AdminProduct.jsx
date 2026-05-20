import React, { useState } from "react";
import "./AdminProduct.css";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/* ================= FETCH PRODUCTS ================= */

const fetchProducts = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/product",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.products;
};

/* ================= FETCH CATEGORIES ================= */

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/categories",
  );

  return data.categories;
};

const AdminProducts = () => {
  const queryClient = useQueryClient();

  /* ================= STATES ================= */

  const [editProduct, setEditProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  /* UPDATE STATES */
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateImage, setUpdateImage] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateStock, setUpdateStock] = useState("");
  /* ================= PRODUCT QUERY ================= */

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  /* ================= CATEGORY QUERY ================= */

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  /* ================= CREATE PRODUCT ================= */

  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://cartify-ecommerce-website.onrender.com/api/product/create",
        {
          title,
          description,
          price,
          image,
          category,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product Created Successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
    },
  });

  /* ================= DELETE PRODUCT ================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://cartify-ecommerce-website.onrender.com/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product Deleted Successfully");
    },
  });

  /* ================= UPDATE PRODUCT ================= */

  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://cartify-ecommerce-website.onrender.com/api/product/update/${editProduct._id}`,
        {
          title: updateTitle,
          description: updateDescription,
          price: updatePrice,
          image: updateImage,
          category: updateCategory,
          stock: updateStock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product Updated Successfully");

      setEditProduct(null);

      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");
      setStock("");
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image || !category || !stock) {
      return toast.error("All fields required");
    }

    createMutation.mutate();
  };

  /* ================= EDIT ================= */

  const handleEdit = (product) => {
    setEditProduct(product);
    setUpdateTitle(product.title);
    setUpdateDescription(product.description);
    setUpdatePrice(product.price);
    setUpdateImage(product.image);
    setUpdateCategory(product.category);
    setUpdateStock(product.stock);
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>

        <p>Loading Checkout...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="admin-products">
      <h1>Manage Products</h1>

      {/* ================= CREATE PRODUCT ================= */}

      <div className="create-product-box">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          {/* TITLE */}

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* PRICE */}

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* IMAGE */}

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {/* IMAGE PREVIEW */}

          {image && <img src={image} alt="preview" className="image-preview" />}

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories?.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          {/* STOCK */}

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          {/* BUTTON */}

          <button type="submit">
            {createMutation.isPending ? "Creating..." : "Add Product"}
          </button>
        </form>
      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="products-grid">
        {products?.map((product) => (
          <div className="admin-product-card" key={product._id}>
            <img src={product.image} alt={product.title} />

            <h2>{product.title}</h2>

            <p className="product-price">₹ {product.price}</p>

            <p className="product-stock">Stock: {product.stock}</p>

            <p className="product-category">{product.category}</p>

            <div className="admin-product-btns">
              <button className="edit-btn" onClick={() => handleEdit(product)}>
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteMutation.mutate(product._id)}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= UPDATE MODAL ================= */}

      {/* ================= UPDATE MODAL ================= */}

      {editProduct && (
        <div className="update-modal">
          <div className="update-box">
            <h2>Update Product</h2>

            {/* TITLE */}

            <input
              type="text"
              placeholder="Title"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />

            {/* DESCRIPTION */}

            <textarea
              placeholder="Description"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
            />

            {/* PRICE */}

            <input
              type="number"
              placeholder="Price"
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
            />

            {/* IMAGE */}

            <input
              type="text"
              placeholder="Image URL"
              value={updateImage}
              onChange={(e) => setUpdateImage(e.target.value)}
            />

            {/* CATEGORY */}

            <select
              value={updateCategory}
              onChange={(e) => setUpdateCategory(e.target.value)}
            >
              <option value="">Select Category</option>

              {categories?.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* STOCK */}

            <input
              type="number"
              placeholder="Stock"
              value={updateStock}
              onChange={(e) => setUpdateStock(e.target.value)}
            />

            {/* BUTTONS */}

            <div className="modal-btns">
              <button
                className="save-btn"
                onClick={() => updateMutation.mutate()}
              >
                {updateMutation.isPending ? "Updating..." : "Save Changes"}
              </button>

              <button
                className="close-btn"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
