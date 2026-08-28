import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — TripMate AI" },
      { name: "description", content: "Sign in to TripMate AI to sync your saved itineraries and favorite destinations." },
      { property: "og:title", content: "Login — TripMate AI" },
      { property: "og:description", content: "Access your saved AI trip itineraries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

const field =
  "w-full rounded-xl border border-input bg-card/70 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div className="relative min-h-screen">
      <SiteNav />
      <div className="absolute inset-0 animate-aurora aurora-field opacity-40" />
      <main className="relative mx-auto grid min-h-screen max-w-md place-items-center px-4 pt-28 pb-16">
        <div className="w-full rounded-3xl glass p-7">
          <h1 className="font-display text-2xl font-extrabold">Welcome back 🌍</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to sync trips across devices.</p>

          {done ? (
            <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5 text-center">
              <p className="text-2xl">✅</p>
              <p className="mt-2 text-sm font-semibold">Demo sign-in successful.</p>
              <Link to="/" className="mt-5 inline-block rounded-xl gradient-cta px-5 py-3 text-sm font-bold">
                Start planning
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                  Email
                </label>
                <input id="email" className={field} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={field}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
              <button type="submit" className="w-full rounded-xl gradient-cta py-3.5 font-display font-extrabold shadow-lift">
                Login
              </button>
              <p className="text-center text-xs text-muted-foreground">Demo only — no account is created.</p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
