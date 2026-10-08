const SessionLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.08]" />

          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-500" />
        </div>

        {/* Text */}
        <p className="mt-4 text-sm font-medium text-zinc-400">
          Loading ...
        </p>

        <p className="mt-1 text-xs text-zinc-600">Please wait a moment</p>
      </div>
    </div>
  );
};

export default SessionLoader;
