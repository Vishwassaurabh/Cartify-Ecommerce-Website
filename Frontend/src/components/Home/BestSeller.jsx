import React from "react";
import "./BestSeller.css";

import { Star, ShoppingCart } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/product",
  );

  return data.products;
};

const BestSeller = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

 if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>

        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <h1 className="best-loading">{error.message}</h1>;
  }

  return (
    <section className="best-section">
      {/* HEADER */}

      <div className="best-header">
        <p>Top Products</p>

        <h1>Best Seller Products</h1>
      </div>

      {/* GRID */}

      <div className="best-grid">
        {products?.map((item) => (
          <Link
            to={`/products/${item._id}`}
            className="best-link"
            key={item._id}
          >
            <div className="best-card">
              {/* IMAGE */}

              <div className="best-image">
                <img src={item.image} alt={item.title} />
              </div>

              {/* CONTENT */}

              <div className="best-content">
                <div className="best-rating">
                  <Star size={16} fill="orange" color="orange" />

                  <span>4.8</span>
                </div>

                <h3>{item.title}</h3>

                <p className="best-category">{item.category}</p>

                <div className="best-bottom">
                  <h2>₹ {item.price}</h2>

                  <button>
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
