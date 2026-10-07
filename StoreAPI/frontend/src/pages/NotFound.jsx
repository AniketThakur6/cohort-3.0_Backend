 import {
  PackageX,
  ArrowLeft,
  Search,
  ShoppingBag,
} from "lucide-react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className="h-fit bg-[#080808] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/[0.04] blur-[120px]" />
      </div>

      {/* Header */}
      <Navbar />

      {/* Content */}
      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-10">
        <div className="w-full max-w-md text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/[0.07] bg-[#101010] text-zinc-600">
            <PackageX size={36} strokeWidth={1.4} />
          </div>

          {/* Error code */}
          <p className="mt-7 mb-6 text-6xl font-bold tracking-tighter text-white/10">
            404
          </p>

          <div className="-mt-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-orange-500">
              Product not found
            </p>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              We couldn't find that product
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              The product may have been removed, or the link you
              followed may no longer be available.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 flex-row">
            <button
              type="button"
              className="flex flex-1  items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              <Search size={17} />
              Browse products
            </button>

            <button
              type="button"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <ArrowLeft size={17} />
              Go back
            </button>
          </div>

          <p className="mt-7 text-xs text-zinc-700">
            StoreAPI · Product catalog
          </p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;