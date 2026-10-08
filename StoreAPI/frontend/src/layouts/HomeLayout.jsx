import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import SessionLoader from "../components/SessionLoader";
import { StoreContext } from "../context/StoreContext";

const HomeLayout = () => {
  const {authLoading} = useContext(AuthContext)
  const {productLoading} = useContext(StoreContext)
  if(authLoading && productLoading){
    return <SessionLoader/>
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
