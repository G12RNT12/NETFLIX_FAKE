export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-5 pb-12 pt-16 text-sm text-muted-foreground md:px-12">
      <a href="#top" className="text-xl font-black tracking-tight text-primary">
        NETFLIS
      </a>
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-xs">
        <a href="#series" className="hover:underline">
          Series
        </a>
        <a href="#movies" className="hover:underline">
          Películas
        </a>
        <a href="#mylist" className="hover:underline">
          Mi lista
        </a>
        <a href="#top" className="hover:underline">
          Volver arriba
        </a>
      </div>
      <p className="mt-6 max-w-lg text-xs leading-relaxed">
        Proyecto de demostración. Los títulos y sus fichas son ficticios; no hay reproducción de
        video ni suscripciones.
      </p>
      <p className="mt-4 text-xs">© 2026 Netflis</p>
    </footer>
  );
}
