import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import SessionLoader from "../../components/SessionLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <SessionLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;