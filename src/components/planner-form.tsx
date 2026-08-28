import { useState } from "react";
import { Sparkles } from "lucide-react";
import { interests as allInterests, transports } from "@/lib/trip-data";
import type { TripInput } from "@/lib/trip-generator";

const field =
  "w-full rounded-xl border border-input bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";
const label = "mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground";

export function PlannerForm({
  initialDestination,
  onGenerate,
  loading,
}: {
  initialDestination?: string;
  onGenerate: (input: TripInput) => void;
  loading: boolean;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(initialDestination ?? "");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("3");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [transport, setTransport] = useState("Train");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleInterest = (i: string) =>
    setPicked((prev) => (prev.includes(i) ? prev.filter((p) => p !== i) : [...prev, i]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!from.trim()) next.from = "Where are you starting from?";
    if (!to.trim()) next.to = "Pick a destination";
    if (!date) next.date = "Choose a travel date";
    if (!days || Number(days) < 1) next.days = "At least 1 day";
    if (!travelers || Number(travelers) < 1) next.travelers = "At least 1 traveler";
    if (!budget || Number(budget) < 1000) next.budget = "Enter a budget of ₹1,000 or more";
    if (picked.length === 0) next.interests = "Select at least one interest";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onGenerate({
      from: from.trim(),
      to: to.trim(),
      date,
      days: Number(days),
      travelers: Number(travelers),
      budget: Number(budget),
      interests: picked,
      transport,
    });
  };

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="mt-1.5 text-xs font-semibold text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} className="rounded-3xl glass p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="from">
            Starting location
          </label>
          <input id="from" className={field} placeholder="Chennai" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Err k="from" />
        </div>
        <div>
          <label className={label} htmlFor="to">
            Destination
          </label>
          <input id="to" className={field} placeholder="Ooty" value={to} onChange={(e) => setTo(e.target.value)} list="dest-list" />
          <Err k="to" />
        </div>
        <div>
          <label className={label} htmlFor="date">
            Travel date
          </label>
          <input id="date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          <Err k="date" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label} htmlFor="days">
              Days
            </label>
            <input id="days" type="number" min={1} max={21} className={field} value={days} onChange={(e) => setDays(e.target.value)} />
            <Err k="days" />
          </div>
          <div>
            <label className={label} htmlFor="travelers">
              Travelers
            </label>
            <input
              id="travelers"
              type="number"
              min={1}
              max={30}
              className={field}
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
            <Err k="travelers" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="budget">
            Total budget (₹)
          </label>
          <input id="budget" type="number" min={0} className={field} placeholder="25000" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <Err k="budget" />
        </div>
      </div>

      <div className="mt-6">
        <span className={label}>Travel interests</span>
        <div className="flex flex-wrap gap-2">
          {allInterests.map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => toggleInterest(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                picked.includes(i)
                  ? "gradient-cta scale-105 shadow-lift"
                  : "border border-border bg-card/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
        <Err k="interests" />
      </div>

      <div className="mt-6">
        <span className={label}>Transportation preference</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {transports.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTransport(t)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                transport === t ? "gradient-cta shadow-lift" : "border border-border bg-card/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "Car" ? "🚗" : t === "Bus" ? "🚌" : t === "Train" ? "🚆" : "✈️"} {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl gradient-cta py-4 font-display text-base font-extrabold shadow-lift transition-transform hover:scale-[1.01] disabled:opacity-70"
      >
        <Sparkles className="h-5 w-5" />
        {loading ? "Planning…" : "Generate My Trip"}
      </button>

      <datalist id="dest-list">
        {["Ooty", "Kodaikanal", "Goa", "Manali", "Kerala", "Jaipur", "Mumbai", "Delhi"].map((d) => (
          <option key={d} value={d} />
        ))}
      </datalist>
    </form>
  );
}
