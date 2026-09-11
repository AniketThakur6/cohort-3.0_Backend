import React, { useContext } from "react";
import { Auth } from "../../shared/context/AuthContex";
import { Navigate, Outlet } from "react-router";

const MainRoute = () => {
  const { user, isHydrating } = useContext(Auth);

  if (isHydrating) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet/>;
};

export default MainRoute;
