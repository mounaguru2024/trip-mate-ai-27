import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { travelTips } from "@/lib/trip-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TripMate AI — How our trip planner works" },
      {
        name: "description",
        content: "TripMate AI turns your budget, interests and travel days into a complete day-by-day Indian itinerary in seconds.",
      },
      { property: "og:title", content: "About TripMate AI" },
      { property: "og:description", content: "How TripMate AI builds budget-aware itineraries for Indian travel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const steps = [
  { n: "01", t: "Share your shape of trip", d: "Start point, destination, dates, days, travellers, budget in ₹ and how you like to move." },
  { n: "02", t: "AI matches the destination", d: "We map your interests onto real attractions, food streets, evening spots and stays." },
  { n: "03", t: "Get a costed day plan", d: "A card per day plus a 30/35/20/15 budget split so you know what each rupee is doing." },
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <h1 className="max-w-3xl font-display text-4xl font-extrabold sm:text-5xl">
          Travel planning that respects your <span className="gradient-text">time and budget</span>
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          TripMate AI is a demo travel intelligence product built around Indian destinations. It uses curated destination data —
          attractions, food, evenings and stays — and shapes it around the way you actually travel.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="rounded-3xl glass p-6">
              <p className="font-display text-3xl font-extrabold gradient-text">{s.n}</p>
              <h2 className="mt-3 text-lg font-bold">{s.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-extrabold">Travel tips from the team</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {travelTips.map((t) => (
              <article key={t.title} className="rounded-3xl glass p-6">
                <span className="text-2xl">{t.icon}</span>
                <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.text}</p>
              </article>
            ))}
          </div>
        </section>

        <Link to="/" className="mt-14 inline-block rounded-2xl gradient-cta px-7 py-4 font-display font-extrabold shadow-lift">
          Plan my trip
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
