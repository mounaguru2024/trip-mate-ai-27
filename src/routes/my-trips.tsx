import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { useLocalState } from "@/lib/local-store";
import { inr, type Trip } from "@/lib/trip-generator";

export const Route = createFileRoute("/my-trips")({
  head: () => ({
    meta: [
      { title: "My Trips — TripMate AI" },
      { name: "description", content: "Every itinerary you saved with TripMate AI, with budgets, days and interests in one place." },
      { property: "og:title", content: "My Trips — TripMate AI" },
      { property: "og:description", content: "Your saved AI-generated travel itineraries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyTrips,
});

function MyTrips() {
  const [trips, setTrips, ready] = useLocalState<Trip[]>("tripmate-trips", []);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
          My <span className="gradient-text">trips</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Saved itineraries live here on this device.</p>

        {ready && trips.length === 0 && (
          <div className="mt-12 rounded-3xl glass p-10 text-center">
            <p className="text-4xl">🧭</p>
            <h2 className="mt-4 font-display text-xl font-extrabold">No saved trips yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">Generate an itinerary and hit “Save trip”.</p>
            <Link to="/" className="mt-6 inline-block rounded-xl gradient-cta px-6 py-3 text-sm font-bold">
              Plan my trip
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((t) => (
            <article key={t.id} className="rounded-3xl glass p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold">
                    {t.input.from} → {t.input.to}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {new Date(t.input.date).toDateString()} · {t.input.days} days · {t.input.travelers} travellers
                  </p>
                </div>
                <button
                  aria-label="Delete trip"
                  onClick={() => setTrips((prev) => prev.filter((p) => p.id !== t.id))}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border hover:bg-secondary"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 font-display text-xl font-extrabold gradient-text">{inr(t.input.budget)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.input.interests.map((i) => (
                  <span key={i} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                    {i}
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {t.days.slice(0, 3).map((d) => (
                  <li key={d.day} className="truncate">
                    Day {d.day}: {d.title}
                  </li>
                ))}
                {t.days.length > 3 && <li className="text-xs">+{t.days.length - 3} more days</li>}
              </ul>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
