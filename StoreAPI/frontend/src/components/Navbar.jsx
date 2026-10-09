import { Search, ShoppingBag, User } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated,user } = useContext(AuthContext);
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080808]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500"
          >
            <ShoppingBag size={19} className="text-black" />
          </div>

          <span className="text-lg text-zinc-300 font-bold tracking-tight">
            Store<span className="text-orange-500">API</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? <div
            className="rounded-xl text-green-600 hover:text-green-500 border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm font-medium transition hover:bg-white/[0.06] sm:block"
          >
            LoggedIn
          </div>:<button
            onClick={() => navigate("/auth")}
            className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] sm:block"
          >
            Sign in
          </button>}

          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.info("Please login first");
                return;
              }
              navigate("/profile");
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-zinc-300 transition hover:bg-white/[0.06]"
          > {!isAuthenticated? <User size={18} />: <div className="text-orange-500 uppercase" >{user.name.split(' ').slice(0,2).map(item=> item[0])}</div> }
            
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
