import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  ArrowRight,
  ShoppingBag,
  LoaderCircle,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    formRef,
    getValues,
    registerSubmit,
    navigate,
  } = useAuth();

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
        <div className="rounded-3xl border border-white/[0.08] bg-[#101010]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
          {/* Heading */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-medium text-orange-500">
              CREATE ACCOUNT
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome to StoreAPI
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Create your account and start exploring the store.
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit(registerSubmit)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("name", {
                    required: "Full name is required",
                    pattern: {
                      value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                      message: "Invalid Name",
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters is required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.05]"
                />
              </div>
              {errors.name && (
                <p className="text-md text-red-700">{errors.name.message}</p>
              )}
            </div>

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
                    required: "email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid Email addresss",
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
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 chararcter is required",
                    },
                    deps: ["confirmPassword"]
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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
                <p className="text-md text-red-700">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("confirmPassword", {
                    required: "Confrim Password",
                    validate: (values) =>
                      values === getValues("password") ||
                      "Passwords do not match",
                    deps: ["password"],
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.05]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-md text-red-700">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-black transition hover:bg-orange-400 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Create account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-white/[0.07] pt-6 text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?
              <button
                onClick={() => navigate("/Auth")}
                type="button"
                className="font-medium ml-2 text-orange-500 transition hover:text-orange-400"
              >
                Sign in
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

export default Register;
