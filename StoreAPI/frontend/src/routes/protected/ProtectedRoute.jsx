import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SessionLoader from "../../components/SessionLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading, toRoute } = useContext(AuthContext);

  if (authLoading) {
    return <SessionLoader />;
  }

  return isAuthenticated ? <Outlet /> :  toRoute ? <Navigate to="/auth" replace /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;