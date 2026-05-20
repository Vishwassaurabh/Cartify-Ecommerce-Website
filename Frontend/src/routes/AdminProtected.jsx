import React from "react";

import {
  Navigate,
} from "react-router-dom";

const AdminProtected = ({ children }) => {

  /* GET USER */

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  /* NOT LOGIN */

  if (!token) {
    return <Navigate to="/login" />;
  }

  /* NOT ADMIN */

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  /* ADMIN ACCESS */
  return children;
};

export default AdminProtected;