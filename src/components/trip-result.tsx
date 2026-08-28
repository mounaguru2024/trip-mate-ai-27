import { Bookmark, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { inr, type Trip } from "@/lib/trip-generator";
import { packingList } from "@/lib/trip-data";
import { useLocalState } from "@/lib/local-store";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-display text-lg font-bold">{value}</p>
    </div>
  );
}

export function TripResult({ trip, onSave, saved }: { trip: Trip; onSave: () => void; saved: boolean }) {
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [, setNothing] = useLocalState("tripmate-noop", 0);
  void setNothing;

  const share = async () => {
    const text = `My ${trip.input.days}-day TripMate AI plan: ${trip.input.from} → ${trip.input.to} for ${trip.input.travelers} traveller(s) on ${inr(trip.input.budget)}.`;
    try {
      if (navigator.share) await navigator.share({ title: "TripMate AI trip", text });
      else await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* dismissed */
    }
  };

  const toggle = (item: string) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]));

  return (
    <div className="animate-rise space-y-8">
      <section className="rounded-3xl glass p-6 sm:p-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">AI generated itinerary</p>
            <h2 className="mt-1 truncate font-display text-2xl font-extrabold sm:text-3xl">
              {trip.input.from} → {trip.input.to}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(trip.input.date).toDateString()} · {trip.input.transport} · {trip.input.days} days
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={onSave}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save trip"}</span>
            </button>
            <button
              onClick={share}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/70 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-secondary"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="From" value={trip.input.from} />
          <Stat label="Destination" value={trip.input.to} />
          <Stat label="Days" value={`${trip.input.days}`} />
          <Stat label="Travelers" value={`${trip.input.travelers}`} />
          <Stat label="Budget" value={inr(trip.input.budget)} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {trip.input.interests.map((i) => (
            <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              {i}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {trip.days.map((d) => (
          <article key={d.day} className="rounded-3xl glass p-6 transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-cta font-display font-extrabold">
                {d.day}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Day {d.day}</p>
                <h3 className="truncate text-lg font-bold">{d.title}</h3>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-3">
                <span>🌅</span>
                <span>
                  <b className="font-bold">Morning:</b> {d.morning}
                </span>
              </li>
              <li className="flex gap-3">
                <span>🍽️</span>
                <span>
                  <b className="font-bold">Afternoon:</b> {d.afternoon}
                </span>
              </li>
              <li className="flex gap-3">
                <span>📸</span>
                <span>
                  <b className="font-bold">Evening:</b> {d.evening}
                </span>
              </li>
              <li className="flex gap-3">
                <span>🌙</span>
                <span>
                  <b className="font-bold">Night:</b> {d.night}
                </span>
              </li>
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl glass p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold">Budget breakdown</h3>
          <p className="text-sm text-muted-foreground">
            {inr(trip.perPerson)} / person · {inr(trip.perDay)} / day
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trip.budget.map((b) => (
            <div key={b.label} className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{b.icon}</span>
                <span className="font-display text-sm font-extrabold text-primary">{b.percent}%</span>
              </div>
              <p className="mt-3 text-sm font-bold">{b.label}</p>
              <p className="font-display text-xl font-extrabold">{inr(b.amount)}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full gradient-cta" style={{ width: `${b.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 font-display text-lg font-extrabold">
          Total: <span className="gradient-text">{inr(trip.input.budget)}</span>
        </p>
      </section>

      <section className="rounded-3xl glass p-6 sm:p-8">
        <h3 className="font-display text-2xl font-extrabold">Packing checklist</h3>
        <p className="mt-1 text-sm text-muted-foreground">Tap items as you pack them.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {packingList.map((item) => {
            const on = checked.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                  on ? "border-primary bg-secondary text-muted-foreground line-through" : "border-border bg-card/60"
                }`}
              >
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? "gradient-cta border-transparent" : "border-border"}`}>
                  {on && <Check className="h-3 w-3" />}
                </span>
                {item}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
