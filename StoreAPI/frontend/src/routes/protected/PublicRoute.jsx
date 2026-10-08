import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SessionLoader from "../../components/SessionLoader";

const PublicRoute = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <SessionLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
