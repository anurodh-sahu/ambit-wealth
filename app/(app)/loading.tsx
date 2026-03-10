export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/30">
      <div className="h-40 w-40 animate-spin rounded-full border-6 border-primary border-t-transparent" />
    </div>
  );
}
