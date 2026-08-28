export function TripLoader() {
  return (
    <div className="grid place-items-center rounded-3xl glass p-12 text-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-secondary border-t-primary" />
        <div className="absolute inset-0 grid place-items-center text-2xl animate-float">✈️</div>
      </div>
      <p className="mt-6 font-display text-lg font-extrabold">AI is planning your perfect trip…</p>
      <p className="mt-1 text-sm text-muted-foreground">Matching your budget, interests and travel days.</p>
      <div className="mt-6 h-2 w-full max-w-sm overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full w-1/3 animate-shimmer rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)", backgroundSize: "200% 100%" }}
        />
      </div>
    </div>
  );
}
