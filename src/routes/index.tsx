import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Compass, Sparkles, Wand2 } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PlannerForm } from "@/components/planner-form";
import { TripLoader } from "@/components/trip-loader";
import { TripResult } from "@/components/trip-result";
import { DestinationCard } from "@/components/destination-card";
import { destinations, travelTips } from "@/lib/trip-data";
import { generateTrip, type Trip, type TripInput } from "@/lib/trip-generator";
import { useLocalState } from "@/lib/local-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TripMate AI — AI Trip Planner for India" },
      {
        name: "description",
        content:
          "Plan your perfect journey with TripMate AI: instant day-by-day itineraries, budget breakdowns in ₹, and curated Indian destinations.",
      },
      { property: "og:title", content: "TripMate AI — Plan Your Perfect Journey" },
      {
        property: "og:description",
        content: "AI-built itineraries tuned to your budget, interests and travel days across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [favorites, setFavorites] = useLocalState<string[]>("tripmate-favorites", []);
  const [savedTrips, setSavedTrips] = useLocalState<Trip[]>("tripmate-trips", []);
  const plannerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleGenerate = (input: TripInput) => {
    setLoading(true);
    setTrip(null);
    setTimeout(() => scrollTo(resultRef), 80);
    setTimeout(() => {
      setTrip(generateTrip(input));
      setLoading(false);
    }, 2100);
  };

  const saved = !!trip && savedTrips.some((t) => t.id === trip.id);
  const saveTrip = () => {
    if (!trip) return;
    setSavedTrips((prev) => (prev.some((t) => t.id === trip.id) ? prev.filter((t) => t.id !== trip.id) : [trip, ...prev]));
  };

  const toggleFav = (name: string) =>
    setFavorites((prev) => (prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]));

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img src={heroImg} alt="Houseboat gliding through Kerala backwaters at sunset" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/72" />
        <div className="absolute inset-0 animate-aurora aurora-field opacity-70" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5" /> AI travel intelligence
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Plan Your <span className="gradient-text">Perfect Journey</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Let AI create the perfect trip based on your budget, interests, and travel duration.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo(plannerRef)}
              className="flex items-center gap-2 rounded-2xl gradient-cta px-7 py-4 font-display text-base font-extrabold shadow-lift transition-transform hover:scale-[1.03]"
            >
              Plan My Trip <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-14 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { k: "8", v: "curated destinations" },
              { k: "60s", v: "to a full itinerary" },
              { k: "₹", v: "budget-first planning" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl glass px-5 py-4">
                <p className="font-display text-2xl font-extrabold gradient-text">{s.k}</p>
                <p className="text-xs font-semibold text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-24 px-4 py-24 sm:px-6">
        <section ref={plannerRef} id="planner" className="scroll-mt-28">
          <header className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <Wand2 className="h-4 w-4" /> Trip planner
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Tell us how you travel</h2>
            <p className="mt-2 text-muted-foreground">
              Fill in the details and TripMate AI builds a day-by-day plan with a full rupee budget split.
            </p>
          </header>
          <PlannerForm initialDestination={chosen} onGenerate={handleGenerate} loading={loading} />
        </section>

        <section ref={resultRef} className="scroll-mt-28">
          {loading && <TripLoader />}
          {!loading && trip && <TripResult trip={trip} onSave={saveTrip} saved={saved} />}
        </section>

        <section id="explore" className="scroll-mt-28">
          <header className="mb-8 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <Compass className="h-4 w-4" /> Explore destinations
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Where India is going this season</h2>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard
                key={d.name}
                dest={d}
                favorite={favorites.includes(d.name)}
                onFavorite={() => toggleFav(d.name)}
                onExplore={() => {
                  setChosen(d.name);
                  scrollTo(plannerRef);
                }}
              />
            ))}
          </div>
        </section>

        <section id="tips" className="scroll-mt-28">
          <header className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Travel tips</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Small habits, smoother trips</h2>
          </header>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {travelTips.map((t) => (
              <article key={t.title} className="rounded-3xl glass p-6 transition-transform hover:-translate-y-1">
                <span className="text-2xl">{t.icon}</span>
                <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
