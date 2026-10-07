import {
  ArrowLeft,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  Tag,
  FileText,
  Save,
  X,
  Trash2,
} from "lucide-react";

const EditProduct = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Main */}
      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-7">
        <button
          type="button"
          className="mb-7 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to products
        </button>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Form */}
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

            <form className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Product name
                </label>

                <div className="relative">
                  <Tag
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type="text"
                    defaultValue="Premium Wireless Headphones"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition focus:border-orange-500/60"
                  />
                </div>
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
                    rows={5}
                    defaultValue="Experience immersive sound with premium wireless headphones designed for everyday listening."
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] py-3 pl-11 pr-4 text-sm leading-6 text-white outline-none transition focus:border-orange-500/60"
                  />
                </div>
              </div>

              {/* Price + Stock */}
              <div className="grid gap-5 sm:grid-cols-3">
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
                      type="number"
                      placeholder="0.00"
                      className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Stock
                  </label>

                  <div className="relative">
                    <Boxes
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      type="number"
                      placeholder="0"
                      className="h-12 appearance-none w-full bg-[#111111] rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Currency
                  </label>

                  <select
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20"
                    defaultValue="INR"
                  >
                    <option value="INR" className="bg-[#111111] text-zinc-500">
                      INR
                    </option>

                    <option value="USD" className="bg-[#111111] text-zinc-200">
                      USD
                    </option>
                  </select>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Category
                </label>

                <select
                  className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#111111] px-4 text-sm text-zinc-300 outline-none transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/20"
                  defaultValue=""
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
              </div>

              {/* Sizes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Available sizes
                </label>

                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 text-sm font-medium text-orange-400"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] px-5 text-sm font-medium text-red-400 transition hover:bg-red-500/[0.08]"
                >
                  <Trash2 size={16} />
                  Delete product
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="h-11 rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-black transition hover:bg-orange-400"
                  >
                    <Save size={16} />
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Image */}
          <aside>
            <div className="rounded-3xl border border-white/[0.07] bg-[#101010] p-5">
              <div className="mb-5">
                <h2 className="font-semibold">Product image</h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Replace the current product image.
                </p>
              </div>

              {/* Current Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Package
                    size={80}
                    strokeWidth={0.8}
                    className="text-zinc-700"
                  />
                </div>

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-zinc-400 backdrop-blur transition hover:text-red-400"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Replace */}
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-400 transition hover:border-orange-500/40 hover:bg-orange-500/[0.04] hover:text-orange-400"
              >
                <ImagePlus size={17} />
                Replace image
              </button>

              <p className="mt-3 text-center text-[11px] text-zinc-700">
                PNG, JPG or WEBP
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#101010] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-600">Product status</span>

                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-zinc-600">Last updated</span>

                <span className="text-xs text-zinc-400">Today</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
