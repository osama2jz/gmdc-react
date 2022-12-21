import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.getItem("userData") ? (
    JSON.parse(localStorage.getItem("userData")).role === "admin" ||
    JSON.parse(localStorage.getItem("userData")).role === "customer" ||
    JSON.parse(localStorage.getItem("userData")).role === "seller" ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
