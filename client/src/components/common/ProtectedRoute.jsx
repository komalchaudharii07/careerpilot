import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Checks if the user is authenticated via local storage JWT token.
 * If token exists, renders child routes using <Outlet />.
 * If not, redirects user to /login page.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Agar user logged in hai toh child components render honge, nahi toh login page par navigate karega
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;