import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainRoute from "./Protected/MainRoute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../module/auth/ui/pages/Login";
import Register from "../module/auth/ui/pages/Register";
import MainLayout from "../layouts/MainLayout";
import PublicRoute from "./Protected/PublicRoute";
import Profile from "../module/profile/ui/Profile";
import { useApi } from "../config/api";
import { Auth } from "../shared/context/AuthContex";

const AppRoutes = () => {
  const api = useApi();
  const { setUser, setAccessToken, setIsHydrating } = useContext(Auth);

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsHydrating(false);
      }
    };

    hydrateUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <MainRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
