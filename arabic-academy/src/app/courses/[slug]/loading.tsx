export default function Loading() {
  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-black/10 rounded w-1/2" />
        <div className="h-4 bg-black/10 rounded w-5/6" />
        <div className="h-10 bg-black/10 rounded w-1/3" />
      </div>
    </div>
  );
}