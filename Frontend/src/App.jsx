import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import PrivateNavbar from "./components/navbar/PrivateNavbar";
import { useAuth } from "./AuthContext/AuthContext";
import Products from "./components/pages/Product/Product";
import SingleProduct from "./components/pages/Product/SingleProduct";
import Cart from "./components/pages/cart/Cart";
import Order from "./components/pages/order/Order";
import Checkout from "./components/pages/Checkout/Checkout";
import SingleOrder from "./components/pages/order/SingleOrder";
import About from "./components/pages/About/About";
import AdminDashboard from "./components/pages/Admin/Admin";
import AdminProducts from "./components/pages/Admin/AdminProduct";
import AdminCategory from "./components/pages/Admin/AdminCategory";
import AdminOrders from "./components/pages/Admin/AdminOrder";
import AdminLayout from "./layouts/AdminLayout";
import AdminProtected from "./routes/AdminProtected";
import { Toaster } from "react-hot-toast";
import Profile from "./components/pages/Profile/Profile";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <BrowserRouter>
        {isAuthenticated ? <PrivateNavbar /> : <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orders/:id" element={<SingleOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <AdminLayout />
              </AdminProtected>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="product" element={<AdminProducts />} />
            <Route path="category" element={<AdminCategory />} />
            <Route path="order" element={<AdminOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
