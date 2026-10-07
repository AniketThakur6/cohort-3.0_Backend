import {
  Search,
  ShoppingBag,
  User,
  Plus,
  SlidersHorizontal,
  Package,
  Star,
  ChevronDown,
} from "lucide-react";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-orange-500">
              STORE COLLECTION
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Explore products
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Discover something you'll love.
            </p>
          </div>

          {/* Add product */}
          <button className="flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-black transition hover:bg-orange-400">
            <Plus size={17} />
            Add product
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mb-5 md:hidden">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-11 pr-4 text-sm outline-none placeholder:text-zinc-600 focus:border-orange-500/50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 text-sm text-zinc-300 transition hover:bg-white/[0.06]">
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 text-sm text-zinc-400 transition hover:bg-white/[0.06]">
            All products
            <ChevronDown size={15} />
          </button>

          <div className="ml-auto hidden text-sm text-zinc-600 sm:block">
            12 products
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Product Card */}
          <div className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010] transition duration-300 hover:-translate-y-1 hover:border-white/[0.12]">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              <div className="flex h-full items-center justify-center">
                <Package size={55} strokeWidth={1} className="text-zinc-700" />
              </div>

              <span className="absolute left-3 top-3 rounded-lg bg-orange-500 px-2.5 py-1 text-[11px] font-semibold text-black">
                NEW
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-zinc-600">Electronics</span>

                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <Star
                    size={13}
                    fill="currentColor"
                    className="text-orange-500"
                  />
                  4.8
                </div>
              </div>

              <h2 className="font-medium text-zinc-100">
                Premium Wireless Headphones
              </h2>

              <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-600">
                High quality wireless headphones with immersive sound.
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold">₹4,999</span>

                <button className="rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-orange-500 hover:text-black">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Repeat cards */}
          {[
            ["Minimal Backpack", "₹2,499", "Lifestyle"],
            ["Smart Watch Pro", "₹6,999", "Accessories"],
            ["Mechanical Keyboard", "₹3,799", "Electronics"],
            ["Everyday Sneakers", "₹3,299", "Fashion"],
            ["Desk Lamp", "₹1,499", "Home"],
            ["Travel Bottle", "₹899", "Lifestyle"],
            ["Wireless Mouse", "₹1,299", "Electronics"],
          ].map(([name, price, category]) => (
            <div
              key={name}
              className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010] transition duration-300 hover:-translate-y-1 hover:border-white/[0.12]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                <div className="flex h-full items-center justify-center">
                  <Package
                    size={55}
                    strokeWidth={1}
                    className="text-zinc-700 transition group-hover:text-zinc-600"
                  />
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">{category}</span>

                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Star
                      size={13}
                      fill="currentColor"
                      className="text-orange-500"
                    />
                    4.6
                  </div>
                </div>

                <h2 className="font-medium text-zinc-100">{name}</h2>

                <p className="mt-1 text-xs text-zinc-600">
                  Premium quality product designed for everyday use.
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">{price}</span>

                  <button className="rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-orange-500 hover:text-black">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
