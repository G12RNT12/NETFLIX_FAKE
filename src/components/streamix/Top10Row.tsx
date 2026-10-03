import { top10 } from "@/data/movies";
import { RowShell } from "./RowShell";
import { useStreamix } from "./StreamixContext";

export function Top10Row() {
  const { open } = useStreamix();
  return (
    <RowShell title="Top 10 en Perú hoy">
      {top10.map((m, i) => (
        <button
          key={m.id}
          onClick={() => open(m)}
          className="group/top flex w-[58vw] shrink-0 items-end sm:w-[40vw] md:w-[30vw] lg:w-[21vw]"
        >
          <span className="text-outline -mr-3 select-none text-[7rem] font-black leading-[0.8] tracking-tighter md:-mr-5 md:text-[10rem]">
            {i + 1}
          </span>
          <div className="relative aspect-[2/3] w-[55%] overflow-hidden rounded-md shadow-xl shadow-background transition-transform duration-300 md:group-hover/top:scale-105">
            <img src={m.image} alt={m.title} loading="lazy" width={1280} height={720} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-2 pt-10 text-left">
              <p className="text-xs font-bold leading-tight md:text-sm">{m.title}</p>
            </div>
          </div>
        </button>
      ))}
    </RowShell>
  );
}
