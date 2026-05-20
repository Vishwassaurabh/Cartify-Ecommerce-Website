import React from "react";
import "./SingleOrder.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "../../components/Footer/Footer";

const fetchSingleOrder = async (id) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `https://cartify-ecommerce-website.onrender.com/api/my-orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.order;
};

const SingleOrder = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  /* ================= QUERY ================= */

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["single-order", id],

    queryFn: () => fetchSingleOrder(id),
  });

  /* ================= CANCEL ORDER ================= */

  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://cartify-ecommerce-website.onrender.com/api/orders/cancel/${id}`,
        {},
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
        queryKey: ["single-order", id],
      });
    },
  });

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>

        <p>Loading Product...</p>
      </div>
    );
  }

  if (isError) {
    return <h1 className="loading">{error.message}</h1>;
  }

  return (
    <>
      <section className="single-order">
        {/* HEADER */}

        <div className="single-order-header">
          <button className="back-btn" onClick={() => navigate("/orders")}>
            ← Back
          </button>

          <h1>Order Details</h1>

          {order.orderStatus !== "Delivered" &&
            order.orderStatus !== "Cancelled" && (
              <button
                className="cancel-btn"
                disabled={cancelOrderMutation.isPending}
                onClick={(e) => {
                  e.stopPropagation();

                  cancelOrderMutation.mutate(order._id);
                }}
              >
                {cancelOrderMutation.isPending
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            )}
        </div>

        {/* TOP */}

        <div className="single-order-top">
          <div className="order-info">
            <h3>Order ID</h3>

            <p>{order._id}</p>
          </div>

          <div className="order-info">
            <h3>Status</h3>

            <span className={`status ${order.orderStatus}`}>
              {order.orderStatus}
            </span>
          </div>

          <div className="order-info">
            <h3>Payment</h3>

            <p>{order.paymentMethod}</p>
          </div>
        </div>

        {/* ADDRESS */}

        <div className="shipping-box">
          <h2>Shipping Address</h2>

          <div className="shipping-grid">
            <div>
              <h4>Full Name</h4>

              <p>{order.shippingAddress.fullName}</p>
            </div>

            <div>
              <h4>Mobile</h4>

              <p>{order.shippingAddress.mobile}</p>
            </div>

            <div>
              <h4>State</h4>

              <p>{order.shippingAddress.state}</p>
            </div>

            <div>
              <h4>City</h4>

              <p>{order.shippingAddress.city}</p>
            </div>

            <div>
              <h4>Postal Code</h4>

              <p>{order.shippingAddress.postalCode}</p>
            </div>

            <div>
              <h4>Country</h4>

              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="full-address">
            <h4>Address</h4>

            <p>{order.shippingAddress.address}</p>
          </div>
        </div>

        {/* ITEMS */}

        <div className="order-products">
          <h2>Order Items</h2>

          <div className="products-list">
            {order.orderItems.map((item) => (
              <div className="product-card2" key={item._id}>
                <img src={item.image} alt={item.title} />

                <div>
                  <h3>{item.title}</h3>

                  <p>
                    Quantity:
                    {item.quantity}
                  </p>

                  <h4>₹ {item.price}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}

        <div className="price-box">
          <div>
            <span>Items Price</span>

            <p>₹{order.itemsPrice}</p>
          </div>

          <div>
            <span>Shipping</span>

            <p>₹{order.shippingPrice}</p>
          </div>

          <div>
            <span>Tax</span>

            <p>₹{order.taxPrice}</p>
          </div>

          <div className="grand-total">
            <span>Total</span>

            <h2>₹{order.totalPrice}</h2>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleOrder;
