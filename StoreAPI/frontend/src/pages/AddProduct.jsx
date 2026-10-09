import { useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  Tag,
  FileText,
  Plus,
  X,
  LoaderCircle,
} from "lucide-react";

import addProductHook from "../hooks/addProductHook";
import ProductImages from "./ProductImages";
import SessionLoader from "./../components/SessionLoader";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    addProduct,
    navigate,
    selectedSizes,
    setSelectedSizes,
    images,
    setImages,
    loading,
  } = addProductHook();

  // Select / deselect a size
  const toggleSize = (size) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((item) => item !== size);
      }

      return [...prev, size];
    });
  };

  if (loading) {
    return <SessionLoader />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-7">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="mb-7 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to products
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* FORM */}
          <div className="rounded-3xl border h-fit border-white/[0.07] bg-[#101010] p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Product details</h2>

              <p className="mt-1 text-sm text-zinc-600">
                Add the information for your new product.
              </p>
            </div>

            <form onSubmit={handleSubmit(addProduct)} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Product title
                </label>

                <div className="relative">
                  <Tag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    {...register("title", {
                      required: "Title is required",
                      pattern: {
                        value: /^[a-zA-Z0-9 -]+$/,
                        message:
                          "Title can contain only letters, numbers, spaces, and hyphens",
                      },
                      maxLength: {
                        value: 100,
                        message: "Title can have maximum 100 characters",
                      },
                      minLength: {
                        value: 20,
                        message: "Title must have at least 20 characters",
                      },
                    })}
                    type="text"
                    placeholder="e.g. Premium Wireless Headphones"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                  />
                </div>

                {errors?.title && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
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
                      pattern: {
                        value: /^[a-zA-Z0-9 -]+$/,
                        message:
                          "Description can contain only letters, numbers, spaces, and hyphens",
                      },
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Description can have maximum 500 characters",
                      },
                    })}
                    rows={5}
                    placeholder="Describe your product..."
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                  />
                </div>

                {errors?.description && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Price + Currency */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Price */}
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
                        required: "Amount is required",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Amount cannot be negative",
                        },
                        validate: (value) =>
                          Number.isFinite(value) ||
                          "Amount must be a valid number",
                      })}
                      type="number"
                      placeholder="0.00"
                      className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                    />
                  </div>

                  {errors?.amount && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Currency
                  </label>

                  <select
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                    defaultValue="INR"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20"
                  >
                    <option value="INR" className="bg-[#111111] text-zinc-200">
                      INR
                    </option>

                    <option value="USD" className="bg-[#111111] text-zinc-200">
                      USD
                    </option>
                  </select>

                  {errors?.currency && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.currency.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20"
                >
                  <option value="" disabled>
                    Select category
                  </option>

                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="accessories">Accessories</option>
                </select>

                {errors?.category && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Sizes */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-zinc-300">
                    Available sizes
                  </label>

                  {selectedSizes.length > 0 && (
                    <span className="text-xs text-zinc-600">
                      {selectedSizes.length} selected
                    </span>
                  )}
                </div>

                {/* Size selector */}
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

                {/* Stock for each selected size */}
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
                        {/* Size */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm font-semibold text-orange-400">
                          {size}
                        </div>

                        {/* Stock input */}
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
                            className="h-10 w-full rounded-lg border border-white/[0.07] bg-[#111111] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                          />
                        </div>

                        {/* Remove size */}
                        <button
                          type="button"
                          onClick={() => toggleSize(size)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
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
                  disabled={isSubmitting || selectedSizes.length === 0}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Creating...{" "}
                    </>
                  ) : (
                    <>
                      <Plus size={17} /> Create{" "}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* IMAGE UPLOAD */}

          <ProductImages images={images} setImages={setImages} />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
