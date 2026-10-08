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
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productData } = useContext(StoreContext);

  if (!productData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            <Package className="text-zinc-600" size={28} />
          </div>

          <h1 className="text-xl font-semibold text-zinc-100">
            Product not found
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

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
          <button
            onClick={() => navigate(`/add`)}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
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
          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 text-sm text-zinc-400 transition hover:bg-white/[0.06]">
            All products
          </button>

          <div className="ml-auto hidden text-sm text-zinc-600 sm:block">
            {productData?.length ?? 0} products
          </div>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Product Card */}
          {productData?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
