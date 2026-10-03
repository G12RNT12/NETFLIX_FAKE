import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { StreamixProvider, useStreamix } from "@/components/streamix/StreamixContext";
import { Navbar } from "@/components/streamix/Navbar";
import { Hero } from "@/components/streamix/Hero";
import { MovieRow } from "@/components/streamix/MovieRow";
import { MovieCard } from "@/components/streamix/MovieCard";
import { MovieModal } from "@/components/streamix/MovieModal";
import { Footer } from "@/components/streamix/Footer";
import { byCategory, searchMovies } from "@/data/movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netflis — Una historia para esta noche" },
      {
        name: "description",
        content:
          "Explora un pequeño catálogo de historias, encuentra una que te llame la atención y guárdala para después. Una demo de Netflis.",
      },
      { property: "og:title", content: "Netflis — Una historia para esta noche" },
      {
        property: "og:description",
        content: "Series, películas y una lista con tus pendientes. Explora la demo de Netflis.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <StreamixProvider>
      <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
        <a
          href="#catalogo"
          className="sr-only fixed left-4 top-4 z-[60] rounded bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only"
        >
          Saltar al catálogo
        </a>
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
  const { query, setQuery, myListMovies } = useStreamix();
  if (query.trim()) {
    const results = searchMovies(query);
    return (
      <main id="catalogo" tabIndex={-1} className="min-h-[70vh] px-5 pb-10 pt-32 md:px-12">
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Búsqueda</p>
        <h1 className="font-display text-3xl md:text-4xl">Resultados para “{query}”</h1>
        <p role="status" className="mb-8 mt-3 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "título encontrado" : "títulos encontrados"}
        </p>
        {results.length ? (
          <div className="flex flex-wrap gap-x-5 gap-y-8">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="max-w-md border-t border-border pt-6">
            <p className="text-muted-foreground">
              No hay coincidencias. Prueba con un título o un género, como “drama” o “ciencia
              ficción”.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-5 text-sm text-primary underline underline-offset-4"
            >
              Volver a explorar
            </button>
          </div>
        )}
      </main>
    );
  }
  return (
    <main>
      <Hero />
      <div id="catalogo" tabIndex={-1} className="relative z-10 -mt-14 pb-6 md:-mt-24">
        <MovieRow title="Para ver esta noche" movies={byCategory("trending")} />
        <MovieRow id="series" title="Series" movies={byCategory("series")} />
        <MovieRow id="movies" title="Películas" movies={byCategory("movies")} />
        <MovieRow id="new" title="Más historias por descubrir" movies={byCategory("new")} />
        <section id="mylist" className="pt-4">
          {myListMovies.length ? (
            <MovieRow title="Mi lista" movies={myListMovies} />
          ) : (
            <div className="mx-5 rounded-sm border border-border px-6 py-8 md:mx-12">
              <p className="mb-2 text-xs uppercase tracking-widest text-primary">Mi lista</p>
              <h2 className="text-2xl font-bold">Para otro día.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Si algo te llama la atención, guárdalo con el botón +. Tus pendientes quedan en este
                navegador, sin crear una cuenta.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
