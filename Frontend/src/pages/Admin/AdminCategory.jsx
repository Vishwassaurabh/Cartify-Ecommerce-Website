import React, { useState } from "react";

import "./AdminCategory.css";

import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ================= FETCH CATEGORIES ================= */

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/categories",
  );

  return data.categories;
};

const AdminCategory = () => {
  const queryClient = useQueryClient();

  /* ================= STATES ================= */

  const [name, setName] = useState("");

  const [parent, setParent] = useState("");

  const [editCategory, setEditCategory] = useState(null);

  /* ================= QUERY ================= */

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  /* ================= CREATE ================= */

  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://cartify-ecommerce-website.onrender.com/api/categories/create",
        {
          name,
          parent,
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
        queryKey: ["categories"],
      });

      alert("Category Created");

      setName("");
      setParent("");
    },
  });

  /* ================= DELETE ================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://cartify-ecommerce-website.onrender.com/api/categories/delete/${id}`,
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
        queryKey: ["categories"],
      });

      alert("Category Deleted");
    },
  });

  /* ================= UPDATE ================= */

  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://cartify-ecommerce-website.onrender.com/api/categories/update/${editCategory._id}`,
        {
          name,
          parent,
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
        queryKey: ["categories"],
      });

      alert("Category Updated");

      setEditCategory(null);

      setName("");
      setParent("");
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      return alert("Category name required");
    }

    createMutation.mutate();
  };

  /* ================= EDIT ================= */

  const handleEdit = (category) => {
    setEditCategory(category);

    setName(category.name);

    setParent(category.parent?._id || "");
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  /* ================= ERROR ================= */

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="admin-category">
      <h1>Manage Categories</h1>

      {/* ================= CREATE ================= */}

      <div className="category-form">
        <h2>Create Category</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={parent} onChange={(e) => setParent(e.target.value)}>
            <option value="">Select Parent Category</option>

            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit">
            {createMutation.isPending ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>

      {/* ================= CATEGORY LIST ================= */}

      <div className="category-grid">
        {categories?.map((category) => (
          <div className="category-card" key={category._id}>
            <h2>{category.name}</h2>

            <p>Parent: {category.parent?.name || "None"}</p>

            <div className="category-btns">
              <button className="edit-btn" onClick={() => handleEdit(category)}>
                Update
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteMutation.mutate(category._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= UPDATE MODAL ================= */}

      {editCategory && (
        <div className="update-modal">
          <div className="update-box">
            <h2>Update Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <select value={parent} onChange={(e) => setParent(e.target.value)}>
              <option value="">Select Parent Category</option>

              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="modal-btns">
              <button
                className="save-btn"
                onClick={() => updateMutation.mutate()}
              >
                {updateMutation.isPending ? "Updating..." : "Save Changes"}
              </button>

              <button
                className="close-btn"
                onClick={() => setEditCategory(null)}
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

export default AdminCategory;
