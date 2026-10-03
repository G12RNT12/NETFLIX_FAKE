import type { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { RowShell } from "./RowShell";

export function MovieRow({ id, title, movies }: { id?: string; title: string; movies: Movie[] }) {
  if (!movies.length) return null;
  return (
    <RowShell id={id} title={title}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </RowShell>
  );
}
