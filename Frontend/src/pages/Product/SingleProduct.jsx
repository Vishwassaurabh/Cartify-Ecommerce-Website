import React from "react";
import "./SingleProduct.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { useRef } from "react";
import toast from "react-hot-toast";

const fetchSingleProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);

  return data.product;
};

const SingleProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  /* ================= PRODUCT QUERY ================= */

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => fetchSingleProduct(id),
  });

  /* ================= ADD TO CART ================= */

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      /* NOT LOGIN */

      if (!token) {
        toast.error("Please Login First");

        navigate("/login");

        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },

    onSuccess: () => {
      navigate("/cart");
    },

    onError: (error) => {
      console.log(error);

      alert(error.response?.data?.message);
    },
  });

  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = e.currentTarget;

    const { left, top, width, height } = container.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transformOrigin = "center";
  };

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
      <section className="single-product">
        <div className="single-product-container">
          {/* LEFT */}

          <div
            className="single-product-image"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img ref={imageRef} src={product?.image} alt={product?.title} />
          </div>

          {/* RIGHT */}

          <div className="single-product-content">
            <p className="category">{product?.category}</p>

            <h1>{product?.title}</h1>

            <div className="rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

              <span>(4.8 Reviews)</span>
            </div>

            <h2>₹ {product?.price}</h2>

            <p className="description">{product?.description}</p>

            <div className="stock">
              Status:
              <span>{product?.stock > 0 ? " In Stock" : " Out Of Stock"}</span>
            </div>

            {/* BUTTON */}

            <div className="product-buttons">
              <button
                className="cart-btn"
                onClick={() => addToCartMutation.mutate()}
              >
                <FaShoppingCart />

                {addToCartMutation.isPending ? "Adding..." : "Add To Cart"}
              </button>

              <button
                className="back-btn"
                onClick={() => navigate("/products")}
              >
                <FaArrowLeft />
                Back To Products
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleProduct;
