import React, { useState } from "react";
import "./Checkout.css";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const fetchCart = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/cart",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

const Checkout = () => {
  const navigate = useNavigate();

  /* ================= ACCORDION ================= */

  const [openSection, setOpenSection] = useState("shipping");

  /* ================= FORM ================= */

  const [fullName, setFullName] = useState("");

  const [mobile, setMobile] = useState("");

  const [state, setState] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] = useState("");

  const [country, setCountry] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [cardHolder, setCardHolder] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  /* ================= CART ================= */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const cart = data?.cart;

  /* ================= PLACE ORDER ================= */

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      const orderItems =
        cart?.items?.map((item) => ({
          product: item.product._id,

          quantity: item.quantity,
        })) || [];

      const response = await axios.post(
        "https://cartify-ecommerce-website.onrender.com/api/orders/create",
        {
          orderItems,

          shippingAddress: {
            fullName,
            mobile,
            state,
            address,
            city,
            postalCode,
            country,
          },

          paymentMethod,
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
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);

        navigate("/orders");
      }, 2500);
    },

    onError: (error) => {
      console.log(error);

      alert(error.response?.data?.message);
    },
  });

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !mobile ||
      !state ||
      !address ||
      !city ||
      !postalCode ||
      !country
    ) {
      return alert("All fields required");
    }

    placeOrderMutation.mutate();
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

  if (isError) {
    return <h1 className="loading">{error.message}</h1>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-box">
          <h1>No Items In Cart</h1>

          <button onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSuccess && (
        <div className="order-success-popup">
          <div className="success-box">
            <div className="success-check">✓</div>

            <h2>Order Placed!</h2>

            <p>Your order has been placed successfully</p>
          </div>
        </div>
      )}

      <section className="checkout">
        {/* BACK BUTTON */}

        <button className="checkout-back-btn" onClick={() => navigate("/cart")}>
          ← Back To Cart
        </button>

        {/* CONTAINER */}

        <div className="checkout-container">
          {/* LEFT */}

          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* SHIPPING */}

            <div className="accordion">
              <div
                className="accordion-header"
                onClick={() =>
                  setOpenSection(openSection === "shipping" ? "" : "shipping")
                }
              >
                <h2>Shipping Address</h2>

                <span>{openSection === "shipping" ? "-" : "+"}</span>
              </div>

              {openSection === "shipping" && (
                <div className="accordion-content">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    maxLength={10}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select State</option>

                    <option value="Uttar Pradesh">Uttar Pradesh</option>

                    <option value="Delhi">Delhi</option>

                    <option value="Maharashtra">Maharashtra</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select City</option>

                    <option value="Varanasi">Varanasi</option>

                    <option value="Lucknow">Lucknow</option>

                    <option value="Kanpur">Kanpur</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />

                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>

                    <option value="India">India</option>

                    <option value="Canada">Canada</option>

                    <option value="USA">USA</option>
                  </select>
                </div>
              )}
            </div>

            {/* PAYMENT */}

            <div className="accordion">
              <div
                className="accordion-header"
                onClick={() =>
                  setOpenSection(openSection === "payment" ? "" : "payment")
                }
              >
                <h2>Payment Method</h2>

                <span>{openSection === "payment" ? "-" : "+"}</span>
              </div>

              {openSection === "payment" && (
                <div className="accordion-content payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="Cash On Delivery"
                      checked={paymentMethod === "Cash On Delivery"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash On Delivery
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={paymentMethod === "UPI"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    UPI Payment
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Credit / Debit Card
                  </label>

                  {/* CARD PAYMENT */}

                  {paymentMethod === "Card" && (
                    <div className="credit-card-container">
                      {/* CARD PREVIEW */}

                      <div className="credit-card">
                        <div className="credit-card-top">
                          <span className="bank-name">Ecommerce Bank</span>

                          <div className="chip"></div>
                        </div>

                        <div className="card-number-preview">
                          {cardNumber || "XXXX XXXX XXXX XXXX"}
                        </div>

                        <div className="credit-card-bottom">
                          <div>
                            <p>Card Holder</p>

                            <h4>{cardHolder || "YOUR NAME"}</h4>
                          </div>

                          <div>
                            <p>Expires</p>

                            <h4>{expiry || "MM/YY"}</h4>
                          </div>
                        </div>
                      </div>

                      {/* INPUTS */}

                      <div className="card-payment-box">
                        <input
                          type="text"
                          placeholder="Card Holder Name"
                          className="card-input"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Card Number"
                          maxLength={16}
                          className="card-input"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />

                        <div className="card-row">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="card-input"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />

                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={3}
                            className="card-input"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BUTTON */}

            <button type="submit">
              {placeOrderMutation.isPending ? "Placing..." : "Place Order"}
            </button>
          </form>

          {/* RIGHT */}

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart?.items?.map((item) => (
              <div className="summary-item" key={item._id}>
                <img src={item.product.image} alt={item.product.title} />

                <div>
                  <h3>{item.product.title}</h3>

                  <p>
                    Qty:
                    {item.quantity}
                  </p>

                  <h4>₹{item.product.price}</h4>
                </div>
              </div>
            ))}

            <div className="total">
              <h2>Total</h2>

              <span>₹ {data?.totalPrice}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
