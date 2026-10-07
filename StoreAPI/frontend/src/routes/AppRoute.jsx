import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import AddProduct from "../pages/AddProduct";
import ProductDetails from "../pages/ProductDetails";
import EditProduct from "../pages/EditProduct";
import Profile from "../pages/Profile";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import PublicRoute from "./protected/PublicRoute";
import HomeLayout from "../layouts/HomeLayout";
import ProtectedRoute from "./protected/ProtectedRoute";
import ProductImages from "../pages/ProductImages";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          index: true,
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          index: true,
          element: <ProductPage />,
        },
        {
          path: ":id",
          element: <ProductDetails />,
        },
        {
          path: "images",
          element: <ProductImages />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "add",
              element: <AddProduct />,
            },
            {
              path: ":id/edit",
              element: <EditProduct />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
