import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, loginFormSubmit, register, errors, navigate } =
    useAuth();

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
      <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/75 shadow-2xl shadow-slate-950/50 backdrop-blur">
        <div className="p-6 sm:p-10">
          <div className="mb-9"></div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Account access
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-slate-400">
            Enter your details to sign in to your account.
          </p>

          <form
            onSubmit={handleSubmit(loginFormSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="flex rounded-xl items-center border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10">
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
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/25"
            >
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-400">
            New here?
            <span
              onClick={() => navigate("/register")}
              className="font-semibold text-cyan-400 cursor-pointer "
            >
              Create an account
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
