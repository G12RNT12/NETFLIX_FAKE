import { top10 } from "@/data/movies";
import { MovieRow } from "./MovieRow";

export function Top10Row() {
  return <MovieRow title="Para empezar a explorar" movies={top10} />;
}
