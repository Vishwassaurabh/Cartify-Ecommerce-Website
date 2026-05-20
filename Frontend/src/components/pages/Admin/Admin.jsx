import React from "react";

import "./Admin.css";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

import { useNavigate } from "react-router-dom";

/* ================= FETCH DASHBOARD ================= */

const fetchDashboard = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    "http://localhost:5000/api/admin/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ================= QUERY ================= */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchDashboard,
  });

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>

        <p>Loading Dashboard...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError) {
    return <h1 className="dashboard-error">{error.message}</h1>;
  }

  return (
    <section className="admin-dashboard">
      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>Welcome Back Admin 👋</p>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="dashboard-stats">
        {/* USERS */}

        <div className="dashboard-card">
          <div className="card-icon users-icon">
            <Users size={30} />
          </div>

          <div>
            <h2>{data.totalUsers}</h2>

            <p>Total Users</p>
          </div>
        </div>

        {/* PRODUCTS */}

        <div className="dashboard-card">
          <div className="card-icon products-icon">
            <Package size={30} />
          </div>

          <div>
            <h2>{data.totalProducts}</h2>

            <p>Total Products</p>
          </div>
        </div>

        {/* ORDERS */}

        <div className="dashboard-card">
          <div className="card-icon orders-icon">
            <ShoppingCart size={30} />
          </div>

          <div>
            <h2>{data.totalOrders}</h2>

            <p>Total Orders</p>
          </div>
        </div>

        {/* REVENUE */}

        <div className="dashboard-card">
          <div className="card-icon revenue-icon">
            <IndianRupee size={30} />
          </div>

          <div>
            <h2>₹ {data.totalRevenue}</h2>

            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}

      <div className="dashboard-box">
        <div className="dashboard-box-header">
          <h2>Recent Orders</h2>

          <button
            className="view-all-btn"
            onClick={() => navigate("/admin/order")}
          >
            View All
          </button>
        </div>

        {data.recentOrders?.length > 0 ? (
          data.recentOrders.map((order) => (
            <div
              className="dashboard-order clickable-order"
              key={order._id}
              onClick={() => navigate("/admin/order")}
            >
              <div>
                <h3>{order.user?.username}</h3>

                <p>{order.paymentMethod}</p>
              </div>

              <span>₹ {order.totalPrice}</span>
            </div>
          ))
        ) : (
          <p>No recent orders found</p>
        )}
      </div>

      {/* ================= LOW STOCK ================= */}

      <div className="dashboard-box">
        <div className="dashboard-box-header">
          <h2>Low Stock Products</h2>

          <button
            className="view-all-btn"
            onClick={() => navigate("/admin/product")}
          >
            View Products
          </button>
        </div>

        {data.lowStockProducts?.length > 0 ? (
          data.lowStockProducts.map((product) => (
            <div
              className="dashboard-order clickable-order"
              key={product._id}
              onClick={() => navigate("/admin/product")}
            >
              <div>
                <h3>{product.title}</h3>

                <p>Category: {product.category}</p>
              </div>

              <span className="low-stock">Stock: {product.stock}</span>
            </div>
          ))
        ) : (
          <p>No low stock products</p>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
