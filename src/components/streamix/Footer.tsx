import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const links = [
  "Preguntas frecuentes",
  "Centro de ayuda",
  "Cuenta",
  "Privacidad",
  "Preferencias de cookies",
  "Términos de uso",
  "Información corporativa",
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-sm text-muted-foreground md:px-12">
      <div className="mb-6 flex gap-5 text-foreground">
        {[Instagram, Facebook, Youtube, Twitter].map((I, i) => (
          <a key={i} href="#" aria-label="Red social" className="transition hover:text-primary">
            <I className="h-6 w-6" />
          </a>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:underline">
              {l}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs">© 2026 Netflix</p>
    </footer>
  );
}
