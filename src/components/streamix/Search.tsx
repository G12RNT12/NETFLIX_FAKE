import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useStreamix } from "./StreamixContext";

export function Search() {
  const { query, setQuery } = useStreamix();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  return (
    <div
      className={`flex items-center gap-2 border transition-all duration-300 ${
        open
          ? "absolute right-5 top-[68px] w-[calc(100vw-40px)] rounded-sm border-border bg-background px-3 py-3 shadow-lg sm:static sm:w-56 sm:py-2"
          : "w-6 border-transparent"
      }`}
    >
      <button onClick={() => setOpen(true)} aria-label="Buscar" className="shrink-0">
        <SearchIcon className="h-5 w-5" />
      </button>
      {open && (
        <>
          <input
            ref={ref}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              window.scrollTo({ top: 0 });
            }}
            aria-label="Buscar títulos, personas o géneros"
            placeholder="Título o género"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setQuery("");
                setOpen(false);
              }
            }}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {open && (
            <button
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              aria-label="Cerrar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
