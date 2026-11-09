import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Route guard component for authentication and role authorization
 */
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("auth_token");
  const storedRoles = JSON.parse(localStorage.getItem("user_roles") || "[]");

  // 1. Unauthenticated -> Send to Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Mismatch -> Send to Role Selection
  if (allowedRole && !storedRoles.includes(allowedRole)) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
};

export default ProtectedRoute;
