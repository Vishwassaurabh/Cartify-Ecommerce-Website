import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import BestSeller from "../../components/Home/BestSeller";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Features from "../../components/Home/Features";
import Footer from "../../components/Footer/Footer";

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
