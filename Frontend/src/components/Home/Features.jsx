import React from "react";
import "./Features.css";
import {
  Truck,
  ShieldCheck,
  Headphones,
  WalletCards,
} from "lucide-react";

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: <Truck size={40} />,
      title: "Free Shipping",
      desc: "Free shipping on all orders over ₹999",
    },

    {
      id: 2,
      icon: <ShieldCheck size={40} />,
      title: "Secure Payment",
      desc: "100% secure and safe payment methods",
    },

    {
      id: 3,
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      desc: "Customer support available anytime",
    },

    {
      id: 4,
      icon: <WalletCards size={40} />,
      title: "Easy Returns",
      desc: "7 days easy return and refund policy",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {featuresData.map((item) => (
          <div className="feature-box" key={item.id}>
            <div className="feature-icon">
              {item.icon}
            </div>

            <div className="feature-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;