import hero from "@/assets/hero.jpg";
import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import m6 from "@/assets/m6.jpg";
import m7 from "@/assets/m7.jpg";
import m8 from "@/assets/m8.jpg";

export type Category = "trending" | "series" | "movies" | "new" | "continue";

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
  matchPercentage: number;
  category: Category[];
  progress?: number;
  remaining?: string;
  cast: string[];
}

const imgs = [m1, m2, m3, m4, m5, m6, m7, m8, hero];

type Seed = [string, string, string[], string, string, Category[]];

const seeds: Seed[] = [
  ["Lluvia de Neón", "Un detective marcado por su pasado persigue a una asesina que solo aparece cuando llueve.", ["Suspenso", "Noir", "Crimen"], "+16", "2 temporadas", ["trending", "series"]],
  ["La Reina de Ceniza", "Tras la caída de su reino, una reina guerrera quema su flota para reconquistar el trono.", ["Fantasía", "Épico", "Drama"], "+16", "3 temporadas", ["trending", "series", "new"]],
  ["La Casa del Bosque", "Una familia hereda una casa donde una ventana se enciende cada noche a las 3:33.", ["Terror", "Misterio"], "+18", "1 h 48 min", ["movies", "trending"]],
  ["Dos Lunas", "Una astronauta varada en un planeta rojo descubre huellas que no son humanas.", ["Ciencia ficción", "Aventura"], "+13", "2 h 12 min", ["movies", "new"]],
  ["Ruta 66: Sin Frenos", "Un piloto retirado acepta un último trabajo que convierte la carretera en un campo de guerra.", ["Acción", "Thriller"], "+16", "1 h 56 min", ["movies", "trending"]],
  ["Malecón", "Dos desconocidos se encuentran cada atardecer en los acantilados de Lima, hasta que uno desaparece.", ["Romance", "Drama"], "+13", "1 temporada", ["series", "new"]],
  ["Abismo", "En una estación submarina, los científicos empiezan a desaparecer uno a uno.", ["Suspenso", "Ciencia ficción"], "+16", "2 temporadas", ["series", "trending"]],
  ["El Último Golpe", "Una banda de ladrones de élite planea robar la bóveda más segura de Sudamérica.", ["Crimen", "Acción"], "+16", "4 temporadas", ["series", "trending"]],
  ["The Last Signal", "Después de recibir una misteriosa señal proveniente del espacio, un grupo de científicos descubre que la humanidad podría no estar sola.", ["Suspenso", "Ciencia ficción", "Drama"], "+16", "8 episodios", ["series", "new"]],
  ["Medianoche en Tokio", "Un hacker y una policía unen fuerzas contra una corporación que controla la ciudad.", ["Thriller", "Ciberpunk"], "+16", "1 temporada", ["series", "new"]],
  ["Corona de Hierro", "La guerra entre dos dinastías se decide en una sola noche.", ["Fantasía", "Bélico"], "+16", "2 h 31 min", ["movies"]],
  ["Ecos", "Una niña escucha voces que predicen tragedias en su pueblo.", ["Terror", "Drama"], "+16", "6 episodios", ["series", "new"]],
  ["Horizonte Rojo", "La primera colonia en Marte pierde contacto con la Tierra.", ["Ciencia ficción", "Drama"], "+13", "2 temporadas", ["series", "movies"]],
  ["Velocidad Terminal", "Un convoy blindado, un desierto y doce horas para cruzarlo.", ["Acción"], "+16", "1 h 44 min", ["movies", "new"]],
  ["Cartas al Pacífico", "Un pescador encuentra botellas con cartas escritas hace cincuenta años.", ["Romance", "Drama"], "TP", "1 h 39 min", ["movies"]],
  ["Profundidad Cero", "Un submarino de investigación queda atrapado en una fosa inexplorada.", ["Suspenso", "Aventura"], "+13", "2 h 03 min", ["movies"]],
  ["Oro Negro", "Un banquero honesto se infiltra en la mafia que lavó su fortuna.", ["Crimen", "Drama"], "+18", "3 temporadas", ["series"]],
  ["Frecuencia", "Un locutor nocturno recibe llamadas del futuro.", ["Misterio", "Ciencia ficción"], "+13", "1 h 52 min", ["movies", "new"]],
];

const castPool = ["Valeria Ríos", "Mateo Salazar", "Lucía Paredes", "Diego Montoya", "Camila Herrera", "Andrés Quispe", "Sofía Ibarra", "Tomás Vega", "Renata Cruz", "Julián Ortega"];

export const movies: Movie[] = seeds.map(([title, description, genres, rating, duration, category], i) => {
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
    matchPercentage: 99 - ((i * 7) % 25),
    category,
    cast: [0, 1, 2].map((k) => castPool[(i + k * 3) % castPool.length]!),
  };
});

// Continuar viendo
[0, 3, 6, 7, 10, 13, 2, 16].forEach((idx, k) => {
  const m = movies[idx]!;
  m.category = [...m.category, "continue"];
  m.progress = [72, 35, 88, 15, 54, 63, 40, 25][k]!;
  m.remaining = `Faltan ${[24, 58, 9, 41, 32, 18, 47, 52][k]!} min`;
});

export const featured = movies.find((m) => m.title === "The Last Signal")!;
featured.year = 2026;

export const byCategory = (c: Category) => movies.filter((m) => m.category.includes(c));

export const top10 = [...movies].sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 10);

export const related = (m: Movie) =>
  movies.filter((o) => o.id !== m.id && o.genres.some((g) => m.genres.includes(g))).slice(0, 6);

export const searchMovies = (q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(s) ||
      m.genres.some((g) => g.toLowerCase().includes(s)) ||
      m.cast.some((c) => c.toLowerCase().includes(s)),
  );
};
