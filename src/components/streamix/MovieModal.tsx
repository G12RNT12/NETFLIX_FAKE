import { Check, Play, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { related } from "@/data/movies";
import { useStreamix } from "./StreamixContext";

export function MovieModal() {
  const { selected: m, close, play, toggleList, inList, open } = useStreamix();
  return (
    <Dialog open={!!m} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-4xl gap-0 overflow-y-auto border-none bg-card p-0 sm:rounded-lg">
        {m && (
          <>
            <div className="relative aspect-video w-full">
              <img src={m.backdrop} alt={m.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-4 md:bottom-10 md:left-10">
                <DialogTitle className="text-3xl font-black uppercase md:text-5xl">{m.title}</DialogTitle>
                <div className="flex gap-2">
                  <button onClick={() => play(m)} className="flex items-center gap-2 rounded bg-foreground px-6 py-2 font-semibold text-background hover:bg-foreground/80">
                    <Play className="h-5 w-5 fill-current" /> Reproducir
                  </button>
                  <button
                    onClick={() => toggleList(m)}
                    aria-label="Mi lista"
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-muted-foreground bg-background/40 hover:border-foreground"
                  >
                    {inList(m.id) ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-6 px-6 pb-8 pt-4 md:grid-cols-[2fr_1fr] md:px-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-match">{m.matchPercentage}% para ti</span>
                  <span className="text-muted-foreground">{m.year}</span>
                  <span className="border border-muted-foreground px-1.5 text-xs">{m.rating}</span>
                  <span className="text-muted-foreground">{m.duration}</span>
                  <span className="rounded-sm border border-muted-foreground px-1 text-[10px] font-bold">HD</span>
                </div>
                <DialogDescription className="text-base text-foreground">{m.description}</DialogDescription>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Reparto: </span>{m.cast.join(", ")}</p>
                <p><span className="text-muted-foreground">Géneros: </span>{m.genres.join(", ")}</p>
              </div>
            </div>
            <div className="px-6 pb-10 md:px-10">
              <h3 className="mb-4 text-xl font-bold">Más como esto</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {related(m).map((r) => (
                  <button key={r.id} onClick={() => open(r)} className="overflow-hidden rounded-md bg-muted text-left transition hover:bg-accent">
                    <img src={r.image} alt={r.title} loading="lazy" className="aspect-video w-full object-cover" />
                    <div className="space-y-1 p-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-match">{r.matchPercentage}%</span>
                        <span className="border border-muted-foreground px-1">{r.rating}</span>
                        <span className="text-muted-foreground">{r.year}</span>
                      </div>
                      <p className="text-sm font-bold">{r.title}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
