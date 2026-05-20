import React from "react";
import "./About.css";
import { FaShippingFast, FaHeadset, FaLock, FaUndo } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <>
    <section className="about">
      {/* HERO */}

      <div className="about-hero">
        <div className="about-overlay"></div>

        <div className="about-hero-content">
          <p>About Our Store</p>

          <h1>Premium Shopping Experience</h1>

          <span>
            Discover high quality products with fast delivery, secure payment
            and trusted customer support.
          </span>
        </div>
      </div>

      {/* ABOUT CONTENT */}

      <div className="about-container">
        {/* LEFT */}

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop"
            alt="about"
          />
        </div>

        {/* RIGHT */}

        <div className="about-content">
          <p className="about-subtitle">Who We Are</p>

          <h2>We Build Modern Ecommerce Experiences</h2>

          <p className="about-text">
            Our mission is to provide premium quality products with seamless
            online shopping experience. We focus on customer satisfaction, fast
            shipping, secure payment and modern design.
          </p>

          <p className="about-text">
            Thousands of customers trust our platform for fashion, electronics,
            accessories and lifestyle products.
          </p>

          <button>Explore Products</button>
        </div>
      </div>

      {/* FEATURES */}

      <div className="about-features">
        <div className="feature-card">
          <FaShippingFast />

          <h3>Fast Delivery</h3>

          <p>Quick and reliable shipping on all orders.</p>
        </div>

        <div className="feature-card">
          <FaLock />

          <h3>Secure Payment</h3>

          <p>100% secure payment with trusted gateways.</p>
        </div>

        <div className="feature-card">
          <FaHeadset />

          <h3>24/7 Support</h3>

          <p>Friendly customer support anytime.</p>
        </div>

        <div className="feature-card">
          <FaUndo />

          <h3>Easy Returns</h3>

          <p>Hassle free return and refund policy.</p>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;
