import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import Loader from "../Components/Loader";
const ProtectedRoute = () => {
  const { isAdminAuthenticated, isLoading } = useContext(AdminContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAdminAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
