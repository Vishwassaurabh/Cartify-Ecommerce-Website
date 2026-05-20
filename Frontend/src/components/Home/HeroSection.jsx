import React from "react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";
import "./HeroSection.css"

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left */}
        <div className="hero-left">
          <p className="sale-badge">Biggest Sale Of The Year 🔥</p>

          <h1>
            Discover The Best <span>Fashion</span> Collection
          </h1>

          <p className="description">
            Upgrade your style with premium fashion, trending sneakers,
            accessories, and modern outfits. Shop smart with amazing discounts.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">
              Shop Now
              <ArrowRight size={20} />
            </button>

            <button className="explore-btn">Explore</button>
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <Truck className="icon" size={28} />
              <h3>Free Shipping</h3>
              <p>Fast delivery worldwide</p>
            </div>

            <div className="feature-card">
              <ShieldCheck className="icon" size={28} />
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>

            <div className="feature-card">
              <Star className="icon" size={28} />
              <h3>Top Quality</h3>
              <p>Premium branded products</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hero-right">
          <div className="blur-bg"></div>

          <img
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop"
            alt="Fashion"
            className="hero-image"
          />

          <div className="floating-card">
            <p>New Collection</p>
            <h3>Summer 2026</h3>
          </div>

          <div className="offer-card">
            <h2>50% OFF</h2>
            <p>Limited Offer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;