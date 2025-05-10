import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("IsLoggedIn") === "true";

  return isLoggedIn ? element : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
