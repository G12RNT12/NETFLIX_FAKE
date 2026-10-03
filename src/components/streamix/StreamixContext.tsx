import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { movies, type Movie } from "@/data/movies";

interface StreamixState {
  toggleList: (movie: Movie) => void;
  inList: (id: string) => boolean;
  selected: Movie | null;
  open: (movie: Movie) => void;
  close: () => void;
  query: string;
  setQuery: (query: string) => void;
  myListMovies: Movie[];
}
const StreamixContext = createContext<StreamixState | null>(null);
const KEY = "streamix-mylist";

export function StreamixProvider({ children }: { children: ReactNode }) {
  const [myList, setMyList] = useState<string[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(stored))
        setMyList(
          stored.filter(
            (id): id is string => typeof id === "string" && movies.some((movie) => movie.id === id),
          ),
        );
    } catch {
      // An unavailable or damaged store should not block the catalog.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(myList));
    } catch {
      // The list remains usable in memory when browser storage is disabled.
    }
  }, [myList, loaded]);

  const toggleList = (movie: Movie) => {
    const saved = myList.includes(movie.id);
    setMyList((list) =>
      list.includes(movie.id) ? list.filter((id) => id !== movie.id) : [...list, movie.id],
    );
    toast(
      saved
        ? `Quitaste “${movie.title}” de tus pendientes`
        : `Guardaste “${movie.title}” para después`,
    );
  };

  return (
    <StreamixContext.Provider
      value={{
        toggleList,
        inList: (id) => myList.includes(id),
        selected,
        open: setSelected,
        close: () => setSelected(null),
        query,
        setQuery,
        myListMovies: movies.filter((movie) => myList.includes(movie.id)),
      }}
    >
      {children}
    </StreamixContext.Provider>
  );
}

export const useStreamix = () => {
  const context = useContext(StreamixContext);
  if (!context) throw new Error("useStreamix requires StreamixProvider");
  return context;
};
