import React from "react";
import "./Order.css";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import SingleOrder from "./SingleOrder";
import Footer from "../../components/Footer/Footer";

const fetchOrders = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("http://localhost:5000/api/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.orders;
};

const Order = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ================= GET ORDERS ================= */

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  /* ================= CANCEL ORDER ================= */

  const cancelOrderMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/orders/cancel/${id}`,
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
        queryKey: ["orders"],
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

  /* ================= EMPTY ================= */

  if (!orders || orders.length === 0) {
    return (
      <div className="empty-order">
        <h1>No Orders Found</h1>
      </div>
    );
  }

  return (
    <>
      <section className="orders">
        {/* HEADER */}

        <div className="orders-header">
          <h1>My Orders</h1>
        </div>

        {/* ORDERS */}

        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              {/* CLICKABLE AREA */}

              <div
                className="order-details"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                {/* TOP */}

                <div className="order-top">
                  <div>
                    <h3>Order ID</h3>

                    <p>{order._id}</p>
                  </div>

                  <div>
                    <h3>Status</h3>

                    <span className={`status ${order.orderStatus}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* ITEMS */}

                <div className="order-items">
                  {order.orderItems.map((item) => (
                    <div className="order-item" key={item._id}>
                      <img src={item.image} alt={item.title} />

                      <div>
                        <h2>{item.title}</h2>

                        <p>
                          Qty:
                          {item.quantity}
                        </p>

                        <h4>₹ {item.price}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}

                <div className="order-bottom">
                  <div>
                    <h2>
                      Total:-
                      <span> ₹{order.totalPrice}</span>
                    </h2>
                  </div>
                </div>
              </div>

              {/* CANCEL BUTTON */}

              {order.orderStatus !== "Cancelled" &&
                order.orderStatus !== "Delivered" && (
                  <button
                    className="cancel-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      cancelOrderMutation.mutate(order._id);
                    }}
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Order;
