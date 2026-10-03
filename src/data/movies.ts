import hero from "@/assets/hero.jpg";
import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import m6 from "@/assets/m6.jpg";
import m7 from "@/assets/m7.jpg";
import m8 from "@/assets/m8.jpg";

export type Category = "trending" | "series" | "movies" | "new";

export interface Movie {
  id: string;
  title: string;
  image: string;
  backdrop: string;
  description: string;
  year: number;
  rating: string;
  duration: string;
  genres: string[];

  category: Category[];

  cast: string[];
}

const imgs = [m1, m2, m3, m4, m5, m6, m7, m8, hero];

type Seed = [string, string, string[], string, string, Category[]];

const seeds: Seed[] = [
  [
    "Lluvia de Neón",
    "Un detective marcado por su pasado persigue a una asesina que solo aparece cuando llueve.",
    ["Suspenso", "Noir", "Crimen"],
    "+16",
    "2 temporadas",
    ["trending", "series"],
  ],
  [
    "La Reina de Ceniza",
    "La guerra terminó, pero nadie sabe quién debe gobernar. Una reina vuelve a su ciudad y descubre que la gente a la que quiere proteger ya no la espera.",
    ["Fantasía", "Épico", "Drama"],
    "+16",
    "3 temporadas",
    ["trending", "series", "new"],
  ],
  [
    "La Casa del Bosque",
    "Una familia hereda una casa donde una ventana se enciende cada noche a las 3:33.",
    ["Terror", "Misterio"],
    "+18",
    "1 h 48 min",
    ["movies", "trending"],
  ],
  [
    "Dos Lunas",
    "Una astronauta varada en un planeta rojo descubre huellas que no son humanas.",
    ["Ciencia ficción", "Aventura"],
    "+13",
    "2 h 12 min",
    ["movies", "new"],
  ],
  [
    "Ruta 66: Sin Frenos",
    "Ramiro prometió no volver a conducir de noche. Pero su hermano necesita cruzar la frontera, y el único coche disponible es el que dejó guardado hace diez años.",
    ["Acción", "Thriller"],
    "+16",
    "1 h 56 min",
    ["movies", "trending"],
  ],
  [
    "Malecón",
    "Dos desconocidos se encuentran cada atardecer en los acantilados de Lima, hasta que uno desaparece.",
    ["Romance", "Drama"],
    "+13",
    "1 temporada",
    ["series", "new"],
  ],
  [
    "Abismo",
    "En una estación submarina, los científicos empiezan a desaparecer uno a uno.",
    ["Suspenso", "Ciencia ficción"],
    "+16",
    "2 temporadas",
    ["series", "trending"],
  ],
  [
    "El Último Golpe",
    "Cinco amigos se reúnen para un robo que llevan años posponiendo. El plan sigue siendo el mismo; ellos, ya no.",
    ["Crimen", "Acción"],
    "+16",
    "4 temporadas",
    ["series", "trending"],
  ],
  [
    "The Last Signal",
    "Una señal llega a un observatorio que lleva años en silencio. Irene, la técnica del turno de noche, reconoce entre el ruido una voz que creía haber olvidado.",
    ["Suspenso", "Ciencia ficción", "Drama"],
    "+16",
    "8 episodios",
    ["series", "new"],
  ],
];

const castPool = [
  "Valeria Ríos",
  "Mateo Salazar",
  "Lucía Paredes",
  "Diego Montoya",
  "Camila Herrera",
  "Andrés Quispe",
  "Sofía Ibarra",
  "Tomás Vega",
  "Renata Cruz",
  "Julián Ortega",
];

export const movies: Movie[] = seeds.map(
  ([title, description, genres, rating, duration, category], i) => {
    const img = title === "The Last Signal" ? hero : imgs[i % 8]!;
    return {
      id: `m${i + 1}`,
      title,
      image: img,
      backdrop: img,
      description,
      year: 2020 + ((i * 3) % 7),
      rating,
      duration,
      genres,

      category,
      cast: [0, 1, 2].map((k) => castPool[(i + k * 3) % castPool.length]!),
    };
  },
);

export const featured = movies.find((m) => m.title === "The Last Signal")!;
featured.year = 2026;

export const byCategory = (c: Category) => movies.filter((m) => m.category.includes(c));

export const top10 = movies.slice(0, 10);

export const related = (m: Movie) =>
  movies.filter((o) => o.id !== m.id && o.genres.some((g) => m.genres.includes(g))).slice(0, 6);

export const searchMovies = (q: string) => {
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const s = normalize(q.trim());
  if (!s) return [];
  return movies.filter(
    (m) =>
      normalize(m.title).includes(s) ||
      m.genres.some((g) => normalize(g).includes(s)) ||
      m.cast.some((c) => normalize(c).includes(s)),
  );
};
