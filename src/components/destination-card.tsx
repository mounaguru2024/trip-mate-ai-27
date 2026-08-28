import { Heart } from "lucide-react";
import type { Destination } from "@/lib/trip-data";

export function DestinationCard({
  dest,
  favorite,
  onFavorite,
  onExplore,
}: {
  dest: Destination;
  favorite: boolean;
  onFavorite: () => void;
  onExplore: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl glass transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
      <div className="relative h-48 overflow-hidden">
        <img
          src={dest.image}
          alt={`${dest.name}, ${dest.region}`}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button
          onClick={onFavorite}
          aria-label={favorite ? `Remove ${dest.name} from favorites` : `Save ${dest.name} to favorites`}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full glass"
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-destructive text-destructive" : "text-foreground"}`} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full glass px-3 py-1 text-xs font-semibold">{dest.region}</span>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-bold">{dest.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{dest.tagline}</p>
        </div>
        <p className="text-sm text-muted-foreground">{dest.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {dest.bestFor.map((b) => (
            <span key={b} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
              {b}
            </span>
          ))}
        </div>
        <button
          onClick={onExplore}
          className="w-full rounded-xl gradient-cta py-2.5 text-sm font-bold transition-transform hover:scale-[1.02]"
        >
          Explore
        </button>
      </div>
    </article>
  );
}
