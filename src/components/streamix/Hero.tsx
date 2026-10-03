import { Info, Play } from "lucide-react";
import { featured } from "@/data/movies";
import { useStreamix } from "./StreamixContext";

export function Hero() {
  const { open, play } = useStreamix();
  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      <img
        src={featured.backdrop}
        alt={featured.title}
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover animate-[scale-in_1.2s_ease-out]"
      />
      <div className="absolute inset-0 bg-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end gap-4 px-4 pb-[18vh] md:px-12">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-muted-foreground animate-fade-in">
          <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] tracking-normal text-primary-foreground">
            TOP 10
          </span>
          TOP 10 SERIES
        </div>
        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight animate-fade-in sm:text-6xl md:text-8xl">
          The Last Signal
        </h1>
        <div className="flex flex-wrap gap-2 text-xs font-medium animate-fade-in">
          {["2026", "+16", "8 episodios", "4K"].map((t) => (
            <span
              key={t}
              className="rounded-sm border border-foreground/40 px-2 py-0.5 text-foreground/90"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="max-w-xl text-sm text-foreground/90 animate-fade-in md:text-lg">
          {featured.description}
        </p>
        <div className="flex gap-3 animate-fade-in">
          <button
            onClick={() => play(featured)}
            className="flex items-center gap-2 rounded bg-foreground px-5 py-2 font-semibold text-background transition hover:bg-foreground/75 md:px-7 md:py-2.5 md:text-lg"
          >
            <Play className="h-5 w-5 fill-current" /> Reproducir
          </button>
          <button
            onClick={() => open(featured)}
            className="flex items-center gap-2 rounded bg-secondary px-5 py-2 font-semibold text-secondary-foreground backdrop-blur transition hover:bg-secondary/70 md:px-7 md:py-2.5 md:text-lg"
          >
            <Info className="h-5 w-5" /> Más información
          </button>
        </div>
      </div>
    </section>
  );
}
