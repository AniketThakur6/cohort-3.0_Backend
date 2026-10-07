import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const useAuth = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const loginSubmit = async (data) => {
    const obj = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await api.post("/auth/login", obj);

      console.log(response);
    } catch (error) {
      toast.error()
    }
  };

  return {
    register,
    handleSubmit,
    getValues,
    errors,
    isSubmitting,
    navigate,
    loginSubmit,
  };
};

export default useAuth;
