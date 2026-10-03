import { Check, Plus } from "lucide-react";
import type { Movie } from "@/data/movies";
import { useStreamix } from "./StreamixContext";
import { cardWidth } from "./RowShell";

export function MovieCard({ movie }: { movie: Movie }) {
  const { open, toggleList, inList } = useStreamix();
  const saved = inList(movie.id);
  return (
    <article
      className={
        cardWidth +
        " group/card relative rounded bg-card transition-transform duration-300 hover:-translate-y-1"
      }
    >
      <button
        onClick={() => open(movie)}
        aria-label={"Ver ficha de " + movie.title}
        className="relative block w-full overflow-hidden rounded-t"
      >
        <img
          src={movie.image}
          alt=""
          loading="lazy"
          width={1280}
          height={720}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
        <span className="absolute left-2 top-1 text-lg font-black text-primary drop-shadow-md">
          N
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-8 text-left text-sm font-bold">
          {movie.title}
        </span>
      </button>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <p className="min-w-0 truncate text-[11px] text-muted-foreground">
          {movie.genres[0]} · {movie.duration}
        </p>
        <button
          onClick={() => toggleList(movie)}
          aria-label={
            (saved ? "Quitar " : "Guardar ") + movie.title + (saved ? " de" : " en") + " mi lista"
          }
          aria-pressed={saved}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-muted-foreground text-foreground transition-colors hover:border-white hover:bg-white/10"
        >
          {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
    </article>
  );
}
