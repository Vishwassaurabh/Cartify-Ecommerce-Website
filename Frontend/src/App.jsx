import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import PrivateNavbar from "./components/navbar/PrivateNavbar";
import { useAuth } from "./AuthContext/AuthContext";
import Products from "./pages/Product/Product";
import SingleProduct from "./pages/Product/SingleProduct";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Checkout from "./pages/Checkout/Checkout";
import SingleOrder from "./pages/order/SingleOrder";
import About from "./pages/About/About";
import AdminDashboard from "./pages/Admin/Admin";
import AdminProducts from "./pages/Admin/AdminProduct";
import AdminCategory from "./pages/Admin/AdminCategory";
import AdminOrders from "./pages/Admin/AdminOrder";
import AdminLayout from "./layouts/AdminLayout";
import AdminProtected from "./routes/AdminProtected";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile/Profile";

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
