import React from "react";
import "./Cart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

const fetchCart = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("http://localhost:5000/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /* ================= GET CART ================= */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const cart = data?.cart;

  /* ================= UPDATE QUANTITY ================= */

  const updateCartMutation = useMutation({
    mutationFn: async ({ itemId, quantity }) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/cart/update/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  /* ================= REMOVE ITEM ================= */

  const removeItemMutation = useMutation({
    mutationFn: async (itemId) => {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  /* ================= LOADING ================= */

  if (!localStorage.getItem("token")) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-box">
          <h1>Please Login First</h1>

          <p>You need to login to access your cart.</p>

          <button onClick={() => navigate("/login")}>Login Now</button>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-box">
          <h1>Access Denied</h1>

          <p>Please login to view your cart.</p>

          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    );
  }

  /* ================= EMPTY CART ================= */

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-box">
          <FaShoppingCart className="empty-cart-icon" />

          <h1>Your Cart Is Empty</h1>

          <p>Looks like you haven't added anything yet.</p>

          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="cart-page">
        {/* Header */}

        <div className="cart-header">
          <button
            className="cart-back-btn"
            onClick={() => navigate("/products")}
          >
            ← Back To Products
          </button>

          <h1>Shopping Cart</h1>
        </div>

        {/* Container */}

        <div className="cart-container">
          {/* LEFT */}

          <div className="cart-items">
            {cart.items.map((item) => (
              <div className="cart-item" key={item._id}>
                {/* IMAGE */}

                <div className="cart-image">
                  <img src={item.product.image} alt={item.product.title} />
                </div>

                {/* CONTENT */}

                <div className="cart-content">
                  <h2>{item.product.title}</h2>

                  <p>₹ {item.product.price}</p>

                  {/* QUANTITY */}

                  <div className="quantity-box">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateCartMutation.mutate({
                          itemId: item._id,
                          quantity: item.quantity - 1,
                        })
                      }
                    >
                      <FaMinus />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateCartMutation.mutate({
                          itemId: item._id,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}

                <button
                  className="remove-btn"
                  onClick={() => removeItemMutation.mutate(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT */}

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>

              <span>{data.totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Total Price</span>

              <span>₹ {data.totalPrice}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
