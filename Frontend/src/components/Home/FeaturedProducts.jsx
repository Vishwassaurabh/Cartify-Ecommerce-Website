import React from "react";
import "./FeaturedProduct.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const fetchFeaturedProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/product");

  return data.products;
};

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
  });

  if (isLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="loading">{error.message}</h1>;
  }

  return (
    <section className="featured">
      {/* Header */}
      <div className="featured-header">
        <p>Featured Collection</p>
        <h1>Trending Products</h1>
      </div>

      {/* Products */}
      <div className="featured-grid">
        {products?.slice(0, 8).map((item) => (
          <Link
            to={`/products/${item._id}`}
            className="featured-link"
            key={item._id}
          >
            <div className="featured-card">
              {/* Image */}
              <div className="featured-image">
                <img src={item.image} alt={item.title} />

                <span className="featured-badge">New</span>
              </div>

              {/* Content */}
              <div className="featured-content">
                <div className="featured-rating">
                  <Star size={16} fill="orange" color="orange" />

                  <span>4.8</span>
                </div>

                <h3>{item.title}</h3>

                <p className="featured-category">{item.category}</p>

                <div className="featured-bottom">
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

export default FeaturedProducts;
