import type { Movie } from "@/data/movies";
import { MovieCard } from "./MovieCard";
import { RowShell } from "./RowShell";

export function MovieRow({
  id,
  title,
  movies,
  showProgress,
}: {
  id?: string | undefined;
  title: string;
  movies: Movie[];
  showProgress?: boolean | undefined;
}) {
  if (!movies.length) return null;
  return (
    <RowShell id={id} title={title}>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} showProgress={showProgress} />
      ))}
    </RowShell>
  );
}

export function ContinueWatching({ movies }: { movies: Movie[] }) {
  return <MovieRow title="Continuar viendo para Grace" movies={movies} showProgress />;
}
