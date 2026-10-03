import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Search } from "./Search";
import { useStreamix } from "./StreamixContext";

const links = [
  { label: "Inicio", target: "top" },
  { label: "Series", target: "series" },
  { label: "Películas", target: "movies" },
  { label: "Novedades", target: "new" },
  { label: "Mi lista", target: "mylist" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { setQuery } = useStreamix();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (target: string) => {
    setMenu(false);
    setQuery("");
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });
  };
  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 border-b transition-colors " +
        (scrolled || menu
          ? "border-transparent bg-background/95"
          : "border-transparent bg-gradient-to-b from-background/80 to-transparent")
      }
    >
      <nav
        aria-label="Navegación principal"
        className="flex h-16 items-center justify-between gap-3 px-5 md:px-12"
      >
        <div className="flex items-center gap-8">
          <button
            onClick={() => go("top")}
            aria-label="Netflis, inicio"
            className="text-2xl font-black tracking-tight text-primary md:text-3xl"
          >
            NETFLIS
          </button>
          <ul className="hidden items-center gap-5 text-sm lg:flex">
            {links.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => go(link.target)}
                  className="text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <Search />
          <button
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center lg:hidden"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {menu && (
        <ul id="mobile-navigation" className="border-t border-border px-5 py-3 lg:hidden">
          {links.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => go(link.target)}
                className="block w-full py-3 text-left text-sm"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
