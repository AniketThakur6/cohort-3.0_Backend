import { LogOut, ShieldAlert, ArrowLeft, X } from "lucide-react";

const Logout = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/[0.04] blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/[0.06] bg-[#080808]/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-5 lg:px-8">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft size={19} />
          </button>

          <span className="ml-3 text-sm font-medium text-zinc-400">
            Account
          </span>
        </div>
      </header>

      {/* Confirmation */}
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/[0.07] bg-[#101010] p-7 text-center shadow-2xl shadow-black/40 sm:p-9">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/[0.07] text-red-400">
              <LogOut size={27} />
            </div>

            {/* Heading */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-red-400">
                Sign out
              </p>

              <h1 className="text-2xl font-semibold tracking-tight">
                Sign out of your account?
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
                You'll need to sign in again to access your account and
                protected features.
              </p>
            </div>

            {/* Security notice */}
            <div className="mt-6 flex gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left">
              <ShieldAlert
                size={18}
                className="mt-0.5 shrink-0 text-zinc-500"
              />

              <p className="text-xs leading-5 text-zinc-600">
                Your authentication session will be securely invalidated when
                you sign out.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                <LogOut size={17} />
                Yes, sign me out
              </button>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm font-medium text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X size={17} />
                Cancel
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-700">
            StoreAPI · Secure authentication
          </p>
        </div>
      </main>
    </div>
  );
};

export default Logout;
