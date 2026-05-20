import React from "react";
import "./Product.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/product",
  );

  return data.products;
};

const Products = () => {
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

        <p>Loading Product...</p>
      </div>
    );
  }

  if (isError) {
    return <h1 className="products-loading">{error.message}</h1>;
  }

  return (
    <>
      <section className="products-section">
        {/* HEADER */}

        <div className="products-heading">
          <p>Our Products</p>

          <h1>Explore Products</h1>
        </div>

        {/* GRID */}

        <div className="products-container">
          {products?.map((item) => (
            <Link
              key={item._id}
              to={`/products/${item._id}`}
              className="products-link"
            >
              <div className="products-card">
                {/* IMAGE */}

                <div className="products-image">
                  <img src={item.image} alt={item.title} />

                  <span className="products-badge">New</span>
                </div>

                {/* CONTENT */}

                <div className="products-content">
                  <div className="products-rating">
                    <FaStar />

                    <span>4.8</span>
                  </div>

                  <h3>{item.title}</h3>

                  <p className="products-category">{item.category}</p>

                  <div className="products-footer">
                    <h2>₹ {item.price}</h2>

                    <button>
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Products;
