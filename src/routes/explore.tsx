import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { DestinationCard } from "@/components/destination-card";
import { destinations, interests } from "@/lib/trip-data";
import { useLocalState } from "@/lib/local-store";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Destinations — TripMate AI" },
      {
        name: "description",
        content: "Browse hand-picked Indian destinations — Ooty, Goa, Manali, Kerala, Jaipur and more — and save your favorites.",
      },
      { property: "og:title", content: "Explore Destinations — TripMate AI" },
      { property: "og:description", content: "Hand-picked Indian destinations with highlights, food and stay ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [filter, setFilter] = useState<string>("All");
  const [favorites, setFavorites] = useLocalState<string[]>("tripmate-favorites", []);

  const list = filter === "All" ? destinations : destinations.filter((d) => d.bestFor.includes(filter));

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
          Explore <span className="gradient-text">destinations</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Tap the heart to favourite a place, then head to the planner to turn it into a full itinerary.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {["All", ...interests].map((i) => (
            <button
              key={i}
              onClick={() => setFilter(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filter === i ? "gradient-cta shadow-lift" : "border border-border bg-card/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DestinationCard
              key={d.name}
              dest={d}
              favorite={favorites.includes(d.name)}
              onFavorite={() =>
                setFavorites((prev) => (prev.includes(d.name) ? prev.filter((f) => f !== d.name) : [...prev, d.name]))
              }
              onExplore={() => {
                window.location.href = "/#planner";
              }}
            />
          ))}
        </div>

        {favorites.length > 0 && (
          <section className="mt-16 rounded-3xl glass p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">❤️ Favorite destinations</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {favorites.map((f) => (
                <span key={f} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-bold text-secondary-foreground">
                  {f}
                </span>
              ))}
            </div>
            <Link to="/" className="mt-6 inline-block rounded-xl gradient-cta px-5 py-3 text-sm font-bold">
              Plan a trip
            </Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
