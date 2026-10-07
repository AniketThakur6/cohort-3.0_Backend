import { Search, ShoppingBag, User } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080808]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500">
            <ShoppingBag size={19} className="text-black" />
          </div>

          <span className="text-lg text-zinc-300 font-bold tracking-tight">
            Store<span className="text-orange-500">API</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] sm:block">
            Sign in
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-zinc-300 transition hover:bg-white/[0.06]">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
