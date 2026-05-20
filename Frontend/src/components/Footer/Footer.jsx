import React from "react";
import "./Footer.css";

import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Top */}
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-box">
          <h1 className="footer-logo">
            Cart<span>ify</span>
          </h1>

          <p>
            Shop premium fashion, electronics, shoes and accessories with
            amazing discounts and fast delivery.
          </p>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="/">
              <FaInstagram />
            </a>

            <a href="/">
              <FaTwitter />
            </a>

            <a href="/">
              <FaLinkedinIn />
            </a>

            <a href="/">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-box">
          <h2>Shop</h2>

          <ul>
            <li>
              <a href="/">Men Fashion</a>
            </li>
            <li>
              <a href="/">Women Fashion</a>
            </li>
            <li>
              <a href="/">Electronics</a>
            </li>
            <li>
              <a href="/">Shoes</a>
            </li>
            <li>
              <a href="/">Accessories</a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-box">
          <h2>Company</h2>

          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
            <li>
              <a href="/">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-box">
          <h2>Support</h2>

          <ul>
            <li>
              <a href="/">Help Center</a>
            </li>
            <li>
              <a href="/">Track Order</a>
            </li>
            <li>
              <a href="/">Return Policy</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-box">
          <h2>Newsletter</h2>

          <p>Subscribe to get updates about offers and new arrivals.</p>

          <form className="newsletter">
            <input type="email" placeholder="Enter your email" />

          </form>
            <button type="submit" className="newsbutton">Subscribe</button>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Cartify Ecommerce. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
