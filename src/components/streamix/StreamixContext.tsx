import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Movie } from "@/data/movies";
import { movies } from "@/data/movies";

interface Ctx {
  myList: string[];
  toggleList: (m: Movie) => void;
  inList: (id: string) => boolean;
  selected: Movie | null;
  open: (m: Movie) => void;
  close: () => void;
  play: (m: Movie) => void;
  query: string;
  setQuery: (q: string) => void;
  myListMovies: Movie[];
}

const C = createContext<Ctx | null>(null);
const KEY = "streamix-mylist";

export function StreamixProvider({ children }: { children: ReactNode }) {
  const [myList, setMyList] = useState<string[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v) setMyList(JSON.parse(v));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(myList));
  }, [myList, loaded]);

  const toggleList = (m: Movie) => {
    setMyList((l) => {
      const has = l.includes(m.id);
      toast(has ? `"${m.title}" eliminado de Mi lista` : `"${m.title}" añadido a Mi lista`);
      return has ? l.filter((x) => x !== m.id) : [...l, m.id];
    });
  };

  return (
    <C.Provider
      value={{
        myList,
        toggleList,
        inList: (id) => myList.includes(id),
        selected,
        open: setSelected,
        close: () => setSelected(null),
        play: (m) => toast(`▶ Reproduciendo "${m.title}"`, { description: "Disfruta la función." }),
        query,
        setQuery,
        myListMovies: movies.filter((m) => myList.includes(m.id)),
      }}
    >
      {children}
    </C.Provider>
  );
}

export const useStreamix = () => {
  const c = useContext(C);
  if (!c) throw new Error("useStreamix outside provider");
  return c;
};
