import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";
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
  const [profile, setProfile] = useState(false);
  const { setQuery } = useStreamix();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (t: string) => {
    setMenu(false);
    setQuery("");
    if (t === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    const el = document.getElementById(t);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background" : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <nav className="flex h-16 items-center justify-between gap-4 px-4 md:h-[68px] md:px-12">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <button
            className="text-muted-foreground lg:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menú"
          >
            <Menu className="h-6 w-6" />
          </button>
          <button
            onClick={() => go("top")}
            className="shrink-0 text-2xl font-black tracking-tight text-primary md:text-3xl"
          >
            NETFLIX
          </button>
          <ul className="hidden items-center gap-5 text-sm lg:flex">
            {links.map((l, i) => (
              <li key={l.label}>
                <button
                  onClick={() => go(l.target)}
                  className={`transition-colors hover:text-muted-foreground ${i === 0 ? "font-semibold" : "text-foreground/85"}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 items-center gap-3 md:gap-5">
          <Search />
          <button className="hidden sm:block" aria-label="Notificaciones">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setProfile((v) => !v)}
              className="flex items-center gap-1"
              aria-label="Perfil"
            >
              <span className="grid h-8 w-8 place-items-center rounded bg-primary text-sm font-bold">
                G
              </span>
              <ChevronDown
                className={`hidden h-4 w-4 transition-transform sm:block ${profile ? "rotate-180" : ""}`}
              />
            </button>
            {profile && (
              <div className="absolute right-0 mt-3 w-48 rounded border border-border bg-background/95 py-2 text-sm shadow-xl animate-fade-in">
                {["Administrar perfiles", "Cuenta", "Centro de ayuda", "Cerrar sesión"].map((x) => (
                  <button
                    key={x}
                    onClick={() => setProfile(false)}
                    className="block w-full px-4 py-2 text-left hover:underline"
                  >
                    {x}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      {menu && (
        <ul className="border-t border-border bg-background/95 px-4 py-3 lg:hidden animate-fade-in">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => go(l.target)}
                className="block w-full py-2.5 text-left text-base"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
