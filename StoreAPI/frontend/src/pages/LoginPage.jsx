import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShoppingBag,
  LoaderCircle,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    navigate,
    loginSubmit,
  } = useAuth();

  const notify=()=>{
    toast.error("hello")
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4 py-10">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-600/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20">
            <ShoppingBag size={21} className="text-black" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Store<span className="text-orange-500">API</span>
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#101010]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-orange-500">
              WELCOME BACK
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              Sign in to your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Enter your credentials to continue to StoreAPI.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(loginSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Email address",
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.05]"
                />
              </div>
              {errors.email && (
                <p className="text-md text-red-700">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "Password minmum Length of 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.05]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-md text-red-700">{errors.password.message}</p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-black transition hover:bg-orange-400 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}
              <button
              onClick={notify}
                type="button"
                className="font-medium text-orange-500 transition hover:text-orange-400"
              >
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Secure authentication · StoreAPI
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
