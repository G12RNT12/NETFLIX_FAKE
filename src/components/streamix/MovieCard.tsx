import { Check, ChevronDown, Play, Plus, ThumbsUp } from "lucide-react";
import type { Movie } from "@/data/movies";
import { useStreamix } from "./StreamixContext";
import { cardWidth } from "./RowShell";

export function MovieCard({ movie, showProgress }: { movie: Movie; showProgress?: boolean | undefined }) {
  const { open, play, toggleList, inList } = useStreamix();
  const listed = inList(movie.id);
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className={`${cardWidth} group/card relative`}>
      <div
        onClick={() => open(movie)}
        className="relative cursor-pointer overflow-hidden rounded-md bg-card shadow-lg shadow-background transition-all duration-300 md:group-hover/card:z-30 md:group-hover/card:-translate-y-6 md:group-hover/card:scale-[1.3] md:group-hover/card:shadow-2xl"
      >
        <div className="relative aspect-video">
          <img src={movie.image} alt={movie.title} loading="lazy" width={1280} height={720} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-2 pb-1.5 pt-6">
            <p className="truncate text-xs font-bold md:text-sm">{movie.title}</p>
          </div>
        </div>
        {showProgress && movie.progress != null && (
          <div className="h-1 bg-muted">
            <div className="h-full bg-primary" style={{ width: `${movie.progress}%` }} />
          </div>
        )}
        <div className="hidden max-h-0 overflow-hidden bg-card px-3 transition-all duration-300 md:block md:group-hover/card:max-h-40 md:group-hover/card:py-3">
          <div className="flex items-center gap-1.5">
            <button onClick={stop(() => play(movie))} aria-label="Reproducir" className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-background">
              <Play className="h-3.5 w-3.5 fill-current" />
            </button>
            <button onClick={stop(() => toggleList(movie))} aria-label="Mi lista" className="grid h-7 w-7 place-items-center rounded-full border-2 border-muted-foreground hover:border-foreground">
              {listed ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </button>
            <button onClick={stop(() => {})} aria-label="Me gusta" className="grid h-7 w-7 place-items-center rounded-full border-2 border-muted-foreground hover:border-foreground">
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button onClick={stop(() => open(movie))} aria-label="Más" className="ml-auto grid h-7 w-7 place-items-center rounded-full border-2 border-muted-foreground hover:border-foreground">
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold">
            <span className="text-match">{movie.matchPercentage}% para ti</span>
            <span className="border border-muted-foreground px-1 text-muted-foreground">{movie.rating}</span>
            <span className="text-muted-foreground">{movie.duration}</span>
          </div>
          {showProgress && movie.remaining ? (
            <p className="mt-1 text-[10px] text-muted-foreground">{movie.remaining}</p>
          ) : (
            <p className="mt-1 truncate text-[10px] text-foreground/85">{movie.genres.join(" · ")}</p>
          )}
        </div>
      </div>
      {showProgress && movie.remaining && <p className="mt-1.5 text-xs text-muted-foreground md:hidden">{movie.remaining}</p>}
    </div>
  );
}
