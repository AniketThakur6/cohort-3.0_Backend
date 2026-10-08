import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const useAuth = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { setUser, setAccessToken } = useContext(AuthContext);

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

      const { user, accessToken } = response?.data;

      setAccessToken(accessToken);
      setUser(user);
      navigate("/");
      formRef.current.reset();
    } catch (error) {}
  };

  const registerSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const obj = {
      ...data,
    };
    
    try {
      const response = await api.post("/auth/register",obj)

      formRef.current.reset();
      navigate('/auth');

    } catch (error) {
      
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
    registerSubmit,
    formRef,
  };
};

export default useAuth;
