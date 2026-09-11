import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from './../../shared/context/AuthContex';

const PublicRoute = () => {
  const { user, isHydrating } = useContext(Auth);

  if (isHydrating) {
    return null;
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PublicRoute;
