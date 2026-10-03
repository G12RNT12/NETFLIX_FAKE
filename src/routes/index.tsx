import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { StreamixProvider, useStreamix } from "@/components/streamix/StreamixContext";
import { Navbar } from "@/components/streamix/Navbar";
import { Hero } from "@/components/streamix/Hero";
import { MovieRow, ContinueWatching } from "@/components/streamix/MovieRow";
import { MovieCard } from "@/components/streamix/MovieCard";
import { Top10Row } from "@/components/streamix/Top10Row";
import { MovieModal } from "@/components/streamix/MovieModal";
import { Footer } from "@/components/streamix/Footer";
import { byCategory, searchMovies } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Streamix — Series y películas ilimitadas" },
      { name: "description", content: "Descubre series y películas: tendencias, Top 10 en Perú, estrenos y más en Streamix." },
      { property: "og:title", content: "Streamix — Series y películas ilimitadas" },
      { property: "og:description", content: "Tendencias, Top 10 en Perú, estrenos y tu lista personal en Streamix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <StreamixProvider>
      <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
        <Navbar />
        <Content />
        <Footer />
        <MovieModal />
        <Toaster position="bottom-center" />
      </div>
    </StreamixProvider>
  );
}

function Content() {
  const { query, myListMovies } = useStreamix();
  if (query.trim()) {
    const results = searchMovies(query);
    return (
      <main className="min-h-[70vh] px-4 pt-28 md:px-12">
        <p className="mb-6 text-muted-foreground">
          Resultados para <span className="text-foreground">"{query}"</span>
        </p>
        {results.length ? (
          <div className="flex flex-wrap gap-x-2 gap-y-8">
            {results.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
        ) : (
          <p className="text-lg">No encontramos coincidencias. Prueba con otro título, persona o género.</p>
        )}
      </main>
    );
  }
  return (
    <main>
      <Hero />
      <div className="relative z-10 -mt-24 md:-mt-32">
        <MovieRow title="Tendencias ahora" movies={byCategory("trending")} />
        <Top10Row />
        <ContinueWatching movies={byCategory("continue")} />
        <MovieRow id="series" title="Series populares" movies={byCategory("series")} />
        <MovieRow id="movies" title="Películas para ti" movies={byCategory("movies")} />
        <MovieRow id="new" title="Nuevos lanzamientos" movies={byCategory("new")} />
        <div id="mylist">
          {myListMovies.length ? (
            <MovieRow title="Mi lista" movies={myListMovies} />
          ) : (
            <section className="px-4 py-5 md:px-12">
              <h2 className="text-lg font-bold md:text-2xl">Mi lista</h2>
              <p className="mt-2 text-sm text-muted-foreground">Aún no has añadido títulos. Usa el botón + en cualquier tarjeta.</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
