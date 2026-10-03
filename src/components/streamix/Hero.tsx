import { Info, Plus, Check } from "lucide-react";
import { featured } from "@/data/movies";
import { useStreamix } from "./StreamixContext";

export function Hero() {
  const { open, toggleList, inList } = useStreamix();
  const saved = inList(featured.id);
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-card md:h-[85vh] md:min-h-[680px]"
    >
      <img
        src={featured.backdrop}
        alt=""
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-background to-transparent" />
      <div className="w-full px-5 pb-28 pt-28 md:px-12 md:pb-40">
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-foreground/80">
          <span className="text-2xl font-black tracking-tight text-primary">N</span> Serie
        </p>
        <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
          The Last
          <br />
          Signal
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground/90 md:text-lg">
          Una señal llega a un observatorio que lleva años en silencio. Alguien tendrá que quedarse
          a escuchar.
        </p>
        <div className="mt-4 flex items-center gap-3 text-sm text-foreground/75">
          <span>{featured.year}</span>
          <span className="border border-foreground/40 px-1.5 text-xs">{featured.rating}</span>
          <span>{featured.duration}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => open(featured)}
            className="flex items-center gap-2 rounded bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/80 md:px-7 md:text-lg"
          >
            <Info className="h-5 w-5" /> Más información
          </button>
          <button
            onClick={() => toggleList(featured)}
            aria-pressed={saved}
            className="flex items-center gap-2 rounded bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary/70 md:text-lg"
          >
            {saved ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {saved ? "En mi lista" : "Mi lista"}
          </button>
        </div>
      </div>
    </section>
  );
}
