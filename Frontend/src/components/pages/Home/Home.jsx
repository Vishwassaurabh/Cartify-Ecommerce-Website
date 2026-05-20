import React from "react";
import HeroSection from "../../Home/HeroSection";
import BestSeller from "../../Home/BestSeller";
import FeaturedProducts from "../../Home/FeaturedProducts";
import Features from "../../Home/Features";
import Footer from "../../Footer/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BestSeller />
      <FeaturedProducts />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
