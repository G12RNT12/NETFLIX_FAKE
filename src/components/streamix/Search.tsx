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
        open ? "w-40 border-foreground/80 bg-background/80 px-2 py-1 sm:w-64" : "w-6 border-transparent"
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
            onBlur={() => !query && setOpen(false)}
            placeholder="Títulos, personas y géneros"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Limpiar">
              <X className="h-4 w-4" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
