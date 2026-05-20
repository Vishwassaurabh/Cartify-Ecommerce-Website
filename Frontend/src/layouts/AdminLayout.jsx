import React from "react";

import {
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Layers3,
  ShoppingCart,
} from "lucide-react";

import "./AdminLayout.css";

const AdminLayout = () => {

  return (
    <section className="admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <h1 className="admin-logo">
          Admin Panel
        </h1>

        <nav className="admin-nav">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "admin-link active"
                : "admin-link"
            }
          >

            <LayoutDashboard size={20} />

            Dashboard

          </NavLink>

          <NavLink
            to="/admin/product"
            className={({ isActive }) =>
              isActive
                ? "admin-link active"
                : "admin-link"
            }
          >

            <Package size={20} />

            Products

          </NavLink>

          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              isActive
                ? "admin-link active"
                : "admin-link"
            }
          >

            <Layers3 size={20} />

            Categories

          </NavLink>

          <NavLink
            to="/admin/order"
            className={({ isActive }) =>
              isActive
                ? "admin-link active"
                : "admin-link"
            }
          >

            <ShoppingCart size={20} />

            Orders

          </NavLink>

        </nav>

      </aside>

      {/* ================= CONTENT ================= */}

      <main className="admin-content">

        <Outlet />

      </main>

    </section>
  );
};

export default AdminLayout;