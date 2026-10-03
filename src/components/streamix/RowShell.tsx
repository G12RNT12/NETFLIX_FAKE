import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function RowShell({
  id,
  title,
  children,
}: {
  id?: string | undefined;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => {
    const element = ref.current;
    if (element)
      element.scrollBy({
        left: direction * element.clientWidth * 0.85,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section id={id} className="relative py-4 md:py-5">
      <div className="mb-2 flex items-center justify-between gap-5 px-5 md:px-12">
        <h2 className="text-lg font-bold tracking-tight md:text-2xl">{title}</h2>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label={"Ver anteriores: " + title}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label={"Ver siguientes: " + title}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-proximity gap-2 overflow-x-auto px-5 pb-3 pt-2 [&>article]:snap-start md:px-12"
      >
        {children}
      </div>
    </section>
  );
}
export const cardWidth = "w-[44vw] shrink-0 sm:w-[31vw] md:w-[24vw] lg:w-[18vw] xl:w-[16vw]";
