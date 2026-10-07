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
} from "lucide-react";

const AddProduct = () => {
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
              <h2 className="text-xl font-semibold">Product details</h2>

              <p className="mt-1 text-sm text-zinc-600">
                Add the information for your new product.
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
                    placeholder="e.g. Premium Wireless Headphones"
                    className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
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
                    placeholder="Describe your product..."
                    className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
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
                  {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-zinc-400 transition hover:border-orange-500/50 hover:text-orange-400"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-end">
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
                  <Plus size={17} />
                  Create product
                </button>
              </div>
            </form>
          </div>

          {/* Image Upload */}
          <aside>
            <div className="rounded-3xl border border-white/[0.07] bg-[#101010] p-5">
              <div className="mb-5">
                <h2 className="font-semibold">Product image</h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Upload an image for your product.
                </p>
              </div>

              {/* Upload area */}
              <button
                type="button"
                className="group flex aspect-square w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] transition hover:border-orange-500/50 hover:bg-orange-500/[0.03]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] text-zinc-500 transition group-hover:bg-orange-500/10 group-hover:text-orange-500">
                  <ImagePlus size={25} />
                </div>

                <p className="text-sm font-medium text-zinc-300">
                  Upload product image
                </p>

                <p className="mt-1 text-xs text-zinc-600">PNG, JPG or WEBP</p>
              </button>

              {/* Image placeholder */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
                  <Package size={18} className="text-zinc-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-zinc-400">
                    No image selected
                  </p>

                  <p className="mt-0.5 text-[11px] text-zinc-700">
                    Product preview
                  </p>
                </div>

                <button
                  type="button"
                  className="text-zinc-600 transition hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tip */}
            <div className="mt-4 rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-4">
              <p className="text-xs font-medium text-orange-500">Product tip</p>

              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Use a clear product image and provide accurate pricing and stock
                information.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
