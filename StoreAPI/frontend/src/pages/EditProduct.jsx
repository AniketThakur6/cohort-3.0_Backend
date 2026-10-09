import { useCallback,useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Boxes,
  Tag,
  FileText,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";

import api from "../api/api";
import ProductImages from "./ProductImages";
import SessionLoader from "../components/SessionLoader";
import addProductHook from "../hooks/addProductHook";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const EditProduct = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    errors,
    navigate,
    selectedSizes,
    setSelectedSizes,
    images,
    setImages,
    loading,
    accessToken,
    reset,
    editProduct,
  } = addProductHook();

  const [productLoading, setProductLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  // Fetch the existing product and populate the form.
  const fetchProduct = useCallback(async () => {
    try {
      setProductLoading(true);

      const response = await api.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const product = response.data?.product;

      const sizes = product.sizes ?? [];
      const stockValues = Object.fromEntries(
        sizes.map(({ size, stock }) => [size, Number(stock ?? 0)]),
      );
      setSelectedSizes(sizes.map((item) => item.size));
      // Keep existing image URLs separately from newly uploaded files.
      const imageUrls = (product?.images || []).map((image) => image.url);
      setExistingImages(imageUrls);

      reset({
        title: product.title ?? "",
        description: product.description ?? "",
        amount: product.price?.amount ?? "",
        currency: product.price?.currency ?? "INR",
        category: product.category ?? "",
        stock: stockValues,
      });

      setImages(
        imageUrls.map((url) => ({
          file: null,
          preview: url,
          existing: true,
        })),
      );
    } catch (error) {
    } finally {
      setProductLoading(false);
    }
  }, [id, accessToken, reset]);

  useEffect(() => {
    if (id && accessToken) {
      fetchProduct();
    }
  }, [id, accessToken, fetchProduct]);

  // Toggle sizes.
  const toggleSize = (size) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((item) => item !== size);
      }

      return [...prev, size];
    });
  };

  // Submit product updates.

  // Show loader only while initially fetching product data.
  if (productLoading) {
    return <SessionLoader />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-7">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to products
        </button>

        <form
          onSubmit={handleSubmit(editProduct)}
          className="grid items-start gap-6 lg:grid-cols-[1fr_340px]"
        >
          {/* Product details */}
          <div className="rounded-3xl border border-white/[0.07] bg-[#101010] p-6 sm:p-8">
            <div className="mb-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <Package size={20} />
              </div>

              <h2 className="text-xl font-semibold">Update product</h2>

              <p className="mt-1 text-sm text-zinc-600">
                Modify the product information below.
              </p>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Product name
              </label>

              <div className="relative">
                <Tag
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 20,
                      message: "Title must have at least 20 characters",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title can have maximum 100 characters",
                    },
                  })}
                  type="text"
                  className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm outline-none focus:border-orange-500/60"
                />
              </div>

              {errors.title && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <div className="relative">
                <FileText
                  size={17}
                  className="absolute left-4 top-4 text-zinc-600"
                />

                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Description must have at least 20 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Description can have maximum 500 characters",
                    },
                  })}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] py-3 pl-11 pr-4 text-sm leading-6 outline-none focus:border-orange-500/60"
                />
              </div>

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and currency */}
            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Price
                </label>

                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    {...register("amount", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: "Price cannot be negative",
                      },
                      validate: (value) =>
                        Number.isFinite(value) || "Enter a valid price",
                    })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm outline-none focus:border-orange-500/60"
                  />
                </div>

                {errors.amount && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Currency
                </label>

                <select
                  {...register("currency", {
                    required: "Currency is required",
                  })}
                  className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none focus:border-orange-500/60"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Category
              </label>

              <select
                {...register("category", {
                  required: "Category is required",
                })}
                className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none focus:border-orange-500/60"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="accessories">Accessories</option>
              </select>

              {errors.category && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Available sizes
                </label>

                <span className="text-xs text-zinc-600">
                  {selectedSizes.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm transition ${
                        isSelected
                          ? "border-orange-500 bg-orange-500/10 text-orange-400"
                          : "border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-orange-500/50 hover:text-orange-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Stock by size */}
              {selectedSizes.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Stock by size
                  </p>

                  {selectedSizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-semibold text-orange-400">
                        {size}
                      </div>

                      <div className="relative flex-1">
                        <Boxes
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        />

                        <input
                          {...register(`stock.${size}`, {
                            required: `Stock for ${size} is required`,
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: "Stock cannot be negative",
                            },
                            validate: (value) =>
                              Number.isInteger(value) ||
                              "Stock must be a whole number",
                          })}
                          type="number"
                          min="0"
                          step="1"
                          placeholder={`Stock for ${size}`}
                          className="h-10 w-full rounded-lg border border-white/[0.07] bg-[#111111] pl-10 pr-3 text-sm outline-none focus:border-orange-500/60"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleSize(size)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Remove size ${size}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selectedSizes.length === 0 && (
                <p className="mt-2 text-xs text-zinc-600">
                  Select at least one size to enter its stock.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="h-11 rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || selectedSizes.length === 0}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <ProductImages images={images} setImages={setImages} />

            <p className="text-xs leading-5 text-zinc-600">
              Uploading new images will replace all existing images when you save.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProduct;
