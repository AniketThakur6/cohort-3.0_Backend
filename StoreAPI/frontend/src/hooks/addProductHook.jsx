import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import api from "./../api/api";
import { AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";

const addProductHook = () => {
  const navigate = useNavigate();

  const { accessToken } = useContext(AuthContext);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const addProduct = async (data) => {
    if (images.length < 1) {
      toast.info("At least image is needed");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);

    formData.append(
      "price",
      JSON.stringify({
        amount: Number(data.amount),
        currency: data.currency,
      }),
    );

    formData.append(
      "sizes",
      JSON.stringify(
        selectedSizes.map((size) => ({
          size,
          stock: Number(data?.stock[size] ?? 0),
        })),
      ),
    );

    images.forEach((image) => formData.append("images", image.file));

    try {
      const response = await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      reset();
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id,data) => {
    if (selectedSizes.length === 0) {
      toast.error("Select at least one size");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);

      formData.append(
        "price",
        JSON.stringify({
          amount: Number(data.amount),
          currency: data.currency,
        }),
      );

      formData.append(
        "sizes",
        JSON.stringify(
          selectedSizes.map((size) => ({
            size,
            stock: Number(data.stock?.[size] ?? 0),
          })),
        ),
      );

      // Only upload newly selected files.
      images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      reset()
      navigate("/");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    reset,
    handleSubmit,
    getValues,
    errors,
    isSubmitting,
    addProduct,
    editProduct,
    navigate,
    selectedSizes,
    setSelectedSizes,
    images,
    setImages,
    loading,
    setLoading,
    accessToken,
    reset,
  };
};

export default addProductHook;
