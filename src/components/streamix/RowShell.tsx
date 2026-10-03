import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function RowShell({ id, title, children }: { id?: string | undefined; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <section id={id} className="group/row relative py-3 md:py-5">
      <h2 className="mb-2 px-4 text-lg font-bold md:px-12 md:text-2xl">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="absolute inset-y-0 left-0 z-20 hidden w-12 items-center justify-center bg-background/50 opacity-0 transition group-hover/row:opacity-100 hover:bg-background/70 md:flex"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
        <div ref={ref} className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-4 py-6 md:-my-2 md:px-12 md:py-10">
          {children}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Siguiente"
          className="absolute inset-y-0 right-0 z-20 hidden w-12 items-center justify-center bg-background/50 opacity-0 transition group-hover/row:opacity-100 hover:bg-background/70 md:flex"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      </div>
    </section>
  );
}

export const cardWidth = "w-[42vw] sm:w-[30vw] md:w-[23vw] lg:w-[16vw] shrink-0";
