import React from "react";
import "./AdminOrder.css";
import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ================= FETCH ORDERS ================= */

const fetchOrders = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get("http://localhost:5000/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.orders;
};

const AdminOrders = () => {
  const queryClient = useQueryClient();

  /* ================= QUERY ================= */

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  /* ================= UPDATE ORDER STATUS ================= */

  const orderStatusMutation = useMutation({
    mutationFn: async ({ id, orderStatus }) => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/orders/status/${id}`,
        {
          orderStatus,
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
        queryKey: ["orders"],
      });

      alert("Order Status Updated");
    },
  });

  /* ================= UPDATE PAYMENT STATUS ================= */

  const paymentStatusMutation = useMutation({
    mutationFn: async ({ id, paymentStatus }) => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/orders/payment/${id}`,
        {
          paymentStatus,
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
        queryKey: ["orders"],
      });

      alert("Payment Status Updated");
    },
  });

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
    <section className="admin-orders">
      <h1>Manage Orders</h1>

      <div className="orders-grid">
        {orders?.map((order) => (
          <div className="order-card" key={order._id}>
            {/* USER */}

            <div className="order-top">
              <h2>{order.user?.username}</h2>

              <p>{order.user?.email}</p>
            </div>

            {/* ORDER ITEMS */}

            <div className="order-items">
              {order.orderItems?.map((item) => (
                <div className="order-item" key={item._id}>
                  <img src={item.image} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>

                    <p>Qty: {item.quantity}</p>

                    <p>₹ {item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}

            <div className="order-price">
              <h3>Total: ₹ {order.totalPrice}</h3>
            </div>

            {/* ORDER STATUS */}

            <div className="status-box">
              <label>Order Status</label>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  orderStatusMutation.mutate({
                    id: order._id,
                    orderStatus: e.target.value,
                  })
                }
              >
                <option value="Processing">Processing</option>

                <option value="Shipped">Shipped</option>

                <option value="Delivered">Delivered</option>

                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* PAYMENT STATUS */}

            <div className="status-box">
              <label>Payment Status</label>

              <select
                value={order.paymentStatus}
                onChange={(e) =>
                  paymentStatusMutation.mutate({
                    id: order._id,
                    paymentStatus: e.target.value,
                  })
                }
              >
                <option value="Pending">Pending</option>

                <option value="Paid">Paid</option>

                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminOrders;
