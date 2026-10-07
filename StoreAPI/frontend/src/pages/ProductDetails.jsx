import { ArrowLeft, Star, Package, Pencil, Trash2 } from "lucide-react";

const ProductDetails = () => {
  return (
    <div className="h-fit bg-[#080808] text-white">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-5 lg:px-8 lg:py-5 lg:pb-13 ">
        {/* Back */}
        <button
          type="button"
          className="mb-6 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to products
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Product Image */}
          <div>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#101010]">
              <div className="flex bg-amber-800 h-full items-center justify-center">
                <Package
                  size={110}
                  strokeWidth={0.8}
                  className="text-zinc-800"
                />
              </div>

              <span className="absolute left-5 top-5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-black">
                NEW
              </span>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`flex aspect-square items-center justify-center rounded-xl border ${
                    item === 1 ? "border-orange-500/70" : "border-white/[0.07]"
                  } bg-[#101010]`}
                >
                  <Package
                    size={24}
                    strokeWidth={1}
                    className="text-zinc-700"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium text-orange-500">
              ELECTRONICS
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Premium Wireless Headphones
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={16}
                    fill="currentColor"
                    className="text-orange-500"
                  />
                ))}
              </div>

              <span className="text-sm text-zinc-500">4.8 · 124 reviews</span>
            </div>

            {/* Price */}
            <div className="mt-7">
              <span className="text-3xl font-semibold">₹4,999</span>

              <span className="ml-3 text-sm text-zinc-600 line-through">
                ₹6,499
              </span>
            </div>

            <div className="my-7 h-px bg-white/[0.06]" />

            {/* Description */}
            <div>
              <h2 className="mb-2 text-sm font-semibold text-zinc-200">
                Description
              </h2>

              <p className="max-w-xl text-sm leading-7 text-zinc-500">
                Experience immersive sound with premium wireless headphones
                designed for everyday listening. Enjoy comfortable ear cushions,
                powerful audio and a long-lasting battery.
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-emerald-500">In stock</span>
              <span className="text-zinc-700">· 24 available</span>
            </div>

            {/* Admin actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] text-sm text-red-400 transition hover:bg-red-500/[0.08]"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
