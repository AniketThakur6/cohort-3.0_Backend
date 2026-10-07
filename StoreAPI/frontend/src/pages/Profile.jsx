import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  LogOut,
  KeyRound,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#080808]/90">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-5 lg:px-8">
          <button
            type="button"
            className="mr-4 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs font-medium text-orange-500">ACCOUNT</p>

            <h1 className="text-base font-semibold">My profile</h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-12">
        {/* Profile Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#101010] p-6 sm:p-8">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/[0.07] blur-[80px]" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-bold text-black shadow-xl shadow-orange-500/10">
              AT
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-semibold">Aniket Thakur</h2>

                <span className="flex items-center gap-1 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <ShieldCheck size={12} />
                  Verified
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-500">aniket@example.com</p>

              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-700">
                <CalendarDays size={14} />
                Member since October 2026
              </div>
            </div>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-6 rounded-3xl border border-white/[0.07] bg-[#101010]">
          <div className="border-b border-white/[0.06] px-6 py-5 sm:px-7">
            <h2 className="font-semibold">Account information</h2>

            <p className="mt-1 text-xs text-zinc-600">
              Your personal account details.
            </p>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {/* Name */}
            <div className="flex items-center gap-4 px-6 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
                <User size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-600">Full name</p>

                <p className="mt-1 text-sm font-medium text-zinc-200">
                  Aniket Thakur
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 px-6 py-5 sm:px-7">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
                <Mail size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-600">Email address</p>

                <p className="mt-1 truncate text-sm font-medium text-zinc-200">
                  aniket@example.com
                </p>
              </div>
            </div>

            {/* Password */}
            <button
              type="button"
              className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-white/[0.02] sm:px-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-500">
                <KeyRound size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-600">Password</p>

                <p className="mt-1 text-sm font-medium text-zinc-200">
                  ••••••••••••
                </p>
              </div>

              <ChevronRight size={17} className="text-zinc-700" />
            </button>
          </div>
        </section>

        {/* Security */}
        <section className="mt-6 rounded-3xl border border-white/[0.07] bg-[#101010] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h2 className="font-semibold">Security</h2>

              <p className="mt-1 text-xs leading-5 text-zinc-600">
                Your account is protected with secure authentication.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-zinc-300">
                Authentication status
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Your session is active
              </p>
            </div>

            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
        </section>

        {/* Logout */}
        <button
          type="button"
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.03] text-sm font-medium text-red-400 transition hover:bg-red-500/[0.08]"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </main>
    </div>
  );
};

export default Profile;
