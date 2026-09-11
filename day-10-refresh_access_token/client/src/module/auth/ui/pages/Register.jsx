import  { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";


const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    registerFormSubmit,
    register,
    getValues,
    errors,
    navigate,
  } = useAuth();

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
      <section className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/75 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <div className="p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Get started
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>
          <p className="mt-2 text-slate-400">
            A few details and you'll be ready to go.
          </p>
          <form
            onSubmit={handleSubmit(registerFormSubmit)}
            className="mt-7 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Full name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 charaters is required",
                  },
                })}
                id="register-name"
                type="text"
                placeholder="Alex Morgan"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                id="register-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="sm:col-span-2 flex rounded-xl items-center border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10">
                <input
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 charaters is required",
                    },
                  })}
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  className="w-full outline-none"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1"
                >
                  {showPassword ? <EyeClosed size={17} /> : <Eye size={17} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Confirm password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  validate: (value) =>
                    getValues("password") === value || "Passwords do not match",
                })}
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat password"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/25 sm:col-span-2"
            >
              Create account <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?
            <span
              onClick={() => navigate("/")}
              className="font-semibold ml-2 text-cyan-400 cursor-pointer "
            >
              Sign in
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
