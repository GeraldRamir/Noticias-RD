import type { MockArticle, MockAuthor, MockCategory } from "./mock-data";

export type ArticleKind = "news" | "opinion" | "agora" | "live";

export type Columnist = MockAuthor & {
  slug: string;
  bio: string;
  avatar: string;
  specialty: string;
  articleCount: number;
};

export type MockVideo = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: Date;
  category: string;
  featured?: boolean;
};

export type MockPodcast = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  duration: string;
  episode: number;
  publishedAt: Date;
};

export type MockEvent = {
  id: string;
  title: string;
  date: Date;
  location: string;
  category: string;
};

export type MockSportsMatch = {
  id: string;
  league: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "live" | "finished" | "scheduled";
  time: string;
};

export type MockTag = { slug: string; name: string; count: number };

export const EXTRA_CATEGORIES: MockCategory[] = [
  {
    id: "cat-opinion",
    name: "Opinión",
    slug: "opinion",
    description: "Columnas, editoriales y análisis",
    color: "#4338CA",
    updatedAt: new Date("2026-08-22"),
  },
  {
    id: "cat-agora",
    name: "Ágora",
    slug: "agora",
    description: "Debate ciudadano y foros de opinión",
    color: "#BE185D",
    updatedAt: new Date("2026-08-21"),
  },
];

export const COLUMNISTS: Columnist[] = [
  {
    id: "author-2",
    name: "María Fernández",
    slug: "maria-fernandez",
    bio: "Columnista de política y sociedad. Premio Nacional de Periodismo 2024.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    specialty: "Política",
    articleCount: 142,
  },
  {
    id: "author-3",
    name: "Carlos Méndez",
    slug: "carlos-mendez",
    bio: "Economista y analista de mercados. Autor de tres libros sobre finanzas caribeñas.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    specialty: "Economía",
    articleCount: 98,
  },
  {
    id: "author-4",
    name: "Rosa Jiménez",
    slug: "rosa-jimenez",
    bio: "Comentarista deportiva y exatleta olímpica. Conductora de CRÓNICA Deportes.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    specialty: "Deportes",
    articleCount: 76,
  },
  {
    id: "author-5",
    name: "Dr. Luis Peña",
    slug: "luis-pena",
    bio: "Académico y columnista de actualidad internacional. Profesor invitado en FLACSO.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    specialty: "Internacional",
    articleCount: 115,
  },
];

const opinionCat = EXTRA_CATEGORIES[0];
const agoraCat = EXTRA_CATEGORIES[1];
const base = new Date("2026-08-22T10:00:00");

function opinionArticle(
  data: Omit<MockArticle, "status" | "category" | "categoryId" | "comments"> & {
    kind?: ArticleKind;
    tags?: string[];
  }
): MockArticle & { kind: ArticleKind; tags: string[] } {
  return {
    ...data,
    status: "PUBLISHED",
    categoryId: opinionCat.id,
    category: opinionCat,
    comments: [],
    kind: data.kind ?? "opinion",
    tags: data.tags ?? ["opinion"],
  };
}

export const OPINION_ARTICLES: (MockArticle & { kind: ArticleKind; tags: string[] })[] = [
  opinionArticle({
    id: "op-1",
    title: "La apuesta necesaria por la seguridad escolar",
    slug: "apuesta-necesaria-seguridad-escolar",
    excerpt:
      "Invertir en entornos seguros no es un gasto: es la base de cualquier proyecto educativo serio.",
    content:
      "<p>En las últimas semanas hemos visto un debate intenso sobre la seguridad en centros educativos. Más allá del ruido político, la pregunta central es simple: ¿estamos dispuestos a priorizar a nuestros niños?</p><p>La evidencia internacional muestra que la prevención comunitaria, la capacitación docente y la infraestructura básica reducen incidentes de forma sostenible.</p>",
    coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    featured: true,
    slider: false,
    views: 4520,
    seoTitle: "Seguridad escolar — Opinión CRÓNICA",
    seoDescription: "Columna sobre inversión en entornos educativos seguros.",
    publishedAt: new Date(base.getTime() - 3600_000 * 3),
    updatedAt: new Date(base.getTime() - 3600_000 * 3),
    author: { id: "author-2", name: "María Fernández" },
    tags: ["educacion", "seguridad", "opinion"],
  }),
  opinionArticle({
    id: "op-2",
    title: "El Caribe frente al nuevo mapa comercial global",
    slug: "caribe-nuevo-mapa-comercial",
    excerpt: "Los acuerdos bilaterales abren ventanas, pero exigen diversificación exportadora real.",
    content:
      "<p>El entusiasmo bursátil tras los últimos tratados comerciales es comprensible, pero insuficiente. Sin productividad y logística competitiva, los aranceles reducidos no se traducen en empleos.</p>",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    featured: false,
    slider: false,
    views: 2890,
    seoTitle: "Caribe y comercio global",
    seoDescription: "Análisis económico sobre acuerdos comerciales regionales.",
    publishedAt: new Date(base.getTime() - 3600_000 * 8),
    updatedAt: new Date(base.getTime() - 3600_000 * 8),
    author: { id: "author-3", name: "Carlos Méndez" },
    tags: ["economia", "comercio", "opinion"],
  }),
  opinionArticle({
    id: "op-3",
    title: "Por qué la selección necesita un proyecto de largo plazo",
    slug: "seleccion-proyecto-largo-plazo",
    excerpt: "Los resultados inmediatos no pueden seguir ocultando la falta de cantera estructurada.",
    content:
      "<p>Cada ciclo clasificatorio reaviva la ilusión colectiva. Pero las potencias que respetamos construyen desde las categorías formativas, no desde los nombres mediáticos.</p>",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=1200&q=80",
    featured: false,
    slider: false,
    views: 5340,
    seoTitle: "Selección y cantera — Opinión",
    seoDescription: "Columna deportiva sobre desarrollo de talento.",
    publishedAt: new Date(base.getTime() - 3600_000 * 12),
    updatedAt: new Date(base.getTime() - 3600_000 * 12),
    author: { id: "author-4", name: "Rosa Jiménez" },
    tags: ["deportes", "seleccion", "opinion"],
  }),
  opinionArticle({
    id: "op-4",
    title: "Geopolítica y migración: lecciones para el Caribe insular",
    slug: "geopolitica-migracion-caribe",
    excerpt: "Las presiones migratorias exigen coordinación regional, no solo respuestas unilaterales.",
    content:
      "<p>Los flujos migratorios actuales no son un fenómeno coyuntural. Son el síntoma de desigualdades estructurales que ningún muro resuelve.</p>",
    coverImage: "https://images.unsplash.com/photo-1526778548025-fa2f5cd551cf?w=1200&q=80",
    featured: false,
    slider: false,
    views: 1980,
    seoTitle: "Migración en el Caribe",
    seoDescription: "Análisis de geopolítica y migración regional.",
    publishedAt: new Date(base.getTime() - 3600_000 * 18),
    updatedAt: new Date(base.getTime() - 3600_000 * 18),
    author: { id: "author-5", name: "Dr. Luis Peña" },
    tags: ["internacional", "migracion", "opinion"],
  }),
  opinionArticle({
    id: "op-5",
    title: "Editorial: La prensa libre es infraestructura democrática",
    slug: "editorial-prensa-libre-infraestructura",
    excerpt: "Sin medios independientes, las instituciones pierden su principal mecanismo de rendición de cuentas.",
    content:
      "<p>En CRÓNICA creemos que informar con rigor es un servicio público. Este editorial reafirma nuestro compromiso con la verificación, la diversidad de voces y la transparencia editorial.</p>",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    featured: true,
    slider: false,
    views: 3210,
    seoTitle: "Editorial — Prensa libre",
    seoDescription: "Editorial sobre el rol de la prensa independiente.",
    publishedAt: new Date(base.getTime() - 3600_000 * 24),
    updatedAt: new Date(base.getTime() - 3600_000 * 24),
    author: { id: "author-1", name: "Administrador" },
    tags: ["editorial", "prensa", "opinion"],
  }),
  opinionArticle({
    id: "op-6",
    title: "La inteligencia artificial no reemplaza al periodista",
    slug: "ia-no-reemplaza-periodista",
    excerpt: "La tecnología amplifica capacidades, pero el juicio editorial sigue siendo humano.",
    content:
      "<p>Automatizar titulares o resúmenes es útil. Sustituir el trabajo de campo, las fuentes y la contextualización no lo es. La redacción debe usar IA con criterio ético.</p>",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    featured: false,
    slider: false,
    views: 2670,
    seoTitle: "IA y periodismo",
    seoDescription: "Columna sobre ética periodística y tecnología.",
    publishedAt: new Date(base.getTime() - 3600_000 * 30),
    updatedAt: new Date(base.getTime() - 3600_000 * 30),
    author: { id: "author-2", name: "María Fernández" },
    tags: ["tecnologia", "periodismo", "opinion"],
  }),
];

export const AGORA_ARTICLES: (MockArticle & { kind: ArticleKind; tags: string[] })[] = [
  {
    id: "ag-1",
    title: "¿Debe el Estado regular las redes sociales?",
    slug: "debe-estado-regular-redes-sociales",
    excerpt: "Ciudadanos, expertos y legisladores debaten en el foro Ágora de CRÓNICA.",
    content:
      "<p>El foro reunió a más de 200 participantes en modalidad híbrida. Los defensores de la regulación citan desinformación; los críticos advierten sobre censura.</p>",
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: false,
    views: 1890,
    seoTitle: "Ágora — Regulación de redes",
    seoDescription: "Debate ciudadano sobre regulación digital.",
    publishedAt: new Date(base.getTime() - 3600_000 * 5),
    updatedAt: new Date(base.getTime() - 3600_000 * 5),
    categoryId: agoraCat.id,
    category: agoraCat,
    author: { id: "author-2", name: "María Fernández" },
    comments: [],
    kind: "agora",
    tags: ["agora", "tecnologia", "debate"],
  },
  {
    id: "ag-2",
    title: "Transporte urbano: ¿metro, teleférico o buses eléctricos?",
    slug: "transporte-urbano-debate-agora",
    excerpt: "Tres propuestas compiten por el consenso ciudadano en la capital.",
    content:
      "<p>Urbanistas, transportistas y vecinos expusieron modelos de movilidad sostenible durante la sesión abierta del Ágora.</p>",
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 1420,
    seoTitle: "Ágora — Transporte urbano",
    seoDescription: "Foro sobre movilidad en la capital.",
    publishedAt: new Date(base.getTime() - 3600_000 * 15),
    updatedAt: new Date(base.getTime() - 3600_000 * 15),
    categoryId: agoraCat.id,
    category: agoraCat,
    author: { id: "author-3", name: "Carlos Méndez" },
    comments: [],
    kind: "agora",
    tags: ["agora", "transporte", "ciudad"],
  },
  {
    id: "ag-3",
    title: "Juventud y empleo: voces desde los barrios",
    slug: "juventud-empleo-voces-barrios",
    excerpt: "Jóvenes de cinco provincias comparten propuestas con panelistas y autoridades.",
    content:
      "<p>El Ágora itinerante llegó a comunidades con alta informalidad laboral. Las propuestas incluyen microcrédito, capacitación técnica y hubs de emprendimiento.</p>",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 980,
    seoTitle: "Ágora — Juventud y empleo",
    seoDescription: "Foro ciudadano sobre oportunidades laborales.",
    publishedAt: new Date(base.getTime() - 3600_000 * 28),
    updatedAt: new Date(base.getTime() - 3600_000 * 28),
    categoryId: agoraCat.id,
    category: agoraCat,
    author: { id: "author-4", name: "Rosa Jiménez" },
    comments: [],
    kind: "agora",
    tags: ["agora", "juventud", "empleo"],
  },
];

export const MOCK_VIDEOS: MockVideo[] = [
  {
    id: "vid-1",
    title: "Resumen del día — Edición vespertina",
    slug: "resumen-dia-edicion-vespertina",
    excerpt: "Lo más relevante de política, economía y deportes en 8 minutos.",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    duration: "8:24",
    views: 15400,
    publishedAt: new Date(base.getTime() - 3600_000 * 2),
    category: "Actualidad",
    featured: true,
  },
  {
    id: "vid-2",
    title: "Entrevista exclusiva al ministro de Obras Públicas",
    slug: "entrevista-ministro-obras-publicas",
    excerpt: "Detalles del plan de infraestructura y cronograma de ejecución.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    duration: "14:02",
    views: 8900,
    publishedAt: new Date(base.getTime() - 3600_000 * 6),
    category: "Nacional",
  },
  {
    id: "vid-3",
    title: "Análisis post-partido: selección nacional",
    slug: "analisis-post-partido-seleccion",
    excerpt: "Táctica, nómina y proyecciones de la prensa deportiva.",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=800&q=80",
    duration: "11:45",
    views: 22100,
    publishedAt: new Date(base.getTime() - 3600_000 * 10),
    category: "Deportes",
    featured: true,
  },
  {
    id: "vid-4",
    title: "Mercados al cierre: ¿qué sigue tras el acuerdo comercial?",
    slug: "mercados-cierre-acuerdo-comercial",
    excerpt: "Panel de analistas interpreta la reacción bursátil.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    duration: "9:18",
    views: 5600,
    publishedAt: new Date(base.getTime() - 3600_000 * 14),
    category: "Economía",
  },
  {
    id: "vid-5",
    title: "Festival de cine: entrevistas en la alfombra roja",
    slug: "festival-cine-alfombra-roja",
    excerpt: "Directores y actores caribeños en la premier nocturna.",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    duration: "6:33",
    views: 4200,
    publishedAt: new Date(base.getTime() - 3600_000 * 20),
    category: "Cultura",
  },
  {
    id: "vid-6",
    title: "CRÓNICA Tech: el futuro del 5G en el país",
    slug: "cronica-tech-futuro-5g",
    excerpt: "Demos en vivo y explicación para usuarios finales.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    duration: "12:07",
    views: 7800,
    publishedAt: new Date(base.getTime() - 3600_000 * 26),
    category: "Tecnología",
  },
];

export const MOCK_PODCASTS: MockPodcast[] = [
  {
    id: "pod-1",
    title: "La mesa de CRÓNICA: política sin filtro",
    slug: "mesa-cronica-politica-sin-filtro",
    description: "Análisis semanal con invitados de distintos espectros ideológicos.",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&q=80",
    duration: "42:15",
    episode: 128,
    publishedAt: new Date(base.getTime() - 3600_000 * 48),
  },
  {
    id: "pod-2",
    title: "Economía en 15: lo que mueve los mercados",
    slug: "economia-en-15-mercados",
    description: "Resumen express de indicadores, tasas y tendencias.",
    coverImage: "https://images.unsplash.com/photo-1590602847861-f357a9332f64?w=400&q=80",
    duration: "15:30",
    episode: 89,
    publishedAt: new Date(base.getTime() - 3600_000 * 72),
  },
  {
    id: "pod-3",
    title: "CRÓNICA Deportes en vivo",
    slug: "cronica-deportes-en-vivo",
    description: "Previas, resultados y opinión desde el estudio móvil.",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=400&q=80",
    duration: "38:50",
    episode: 215,
    publishedAt: new Date(base.getTime() - 3600_000 * 24),
  },
  {
    id: "pod-4",
    title: "Historias que importan",
    slug: "historias-que-importan",
    description: "Periodismo narrativo y reportajes de fondo en formato audio.",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    duration: "28:44",
    episode: 56,
    publishedAt: new Date(base.getTime() - 3600_000 * 96),
  },
];

export const MOCK_UTILITIES = {
  weather: {
    city: "Santo Domingo",
    temp: 31,
    condition: "Parcialmente nublado",
    humidity: 72,
    wind: "18 km/h NE",
  },
  exchange: [
    { currency: "USD", buy: 58.45, sell: 59.12, change: "+0.08" },
    { currency: "EUR", buy: 63.2, sell: 64.05, change: "-0.12" },
  ],
  lottery: {
    name: "Loto — sorteo nocturno",
    numbers: ["07", "14", "23", "31", "38", "42"],
    bonus: "19",
    date: "21 ago 2026",
  },
};

export const MOCK_SPORTS: MockSportsMatch[] = [
  {
    id: "s-1",
    league: "Clasificatorio CONCACAF",
    home: "Rep. Dom.",
    away: "Jamaica",
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    time: "Final",
  },
  {
    id: "s-2",
    league: "LIDOM",
    home: "Licey",
    away: "Águilas",
    homeScore: 4,
    awayScore: 3,
    status: "live",
    time: "7° inning",
  },
  {
    id: "s-3",
    league: "LNB",
    home: "San Carlos",
    away: "Metros",
    homeScore: null,
    awayScore: null,
    status: "scheduled",
    time: "8:00 PM",
  },
];

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: "ev-1",
    title: "Foro Ágora: Ciudad sostenible",
    date: new Date("2026-08-25T18:00:00"),
    location: "Teatro Nacional, SD",
    category: "Ágora",
  },
  {
    id: "ev-2",
    title: "Exposición: Arte caribeño contemporáneo",
    date: new Date("2026-08-28T10:00:00"),
    location: "Museo de Arte Moderno",
    category: "Cultura",
  },
  {
    id: "ev-3",
    title: "CRÓNICA Talks: Periodismo e IA",
    date: new Date("2026-09-02T19:00:00"),
    location: "Centro de Convenciones",
    category: "Tecnología",
  },
];

export const ARTICLE_TAGS: Record<string, string[]> = {
  "art-1": ["infraestructura", "gobierno", "caribe"],
  "art-2": ["seleccion", "deportes", "clasificatorio"],
  "art-3": ["economia", "mercados", "comercio"],
  "art-4": ["cultura", "cine", "festival"],
  "art-5": ["startups", "tecnologia", "inversion"],
  "art-6": ["clima", "internacional", "caribe"],
  "art-7": ["salud", "hospital", "cibao"],
  "art-8": ["turismo", "economia", "playas"],
  "art-13": ["ia", "educacion", "tecnologia"],
  "art-18": ["musica", "cultura", "concierto"],
  "art-19": ["5g", "telecomunicaciones", "tecnologia"],
};

export const MOCK_TAGS: MockTag[] = [
  { slug: "seleccion", name: "Selección nacional", count: 8 },
  { slug: "economia", name: "Economía", count: 12 },
  { slug: "turismo", name: "Turismo", count: 6 },
  { slug: "tecnologia", name: "Tecnología", count: 9 },
  { slug: "gobierno", name: "Gobierno", count: 11 },
  { slug: "clima", name: "Clima", count: 4 },
  { slug: "opinion", name: "Opinión", count: 6 },
  { slug: "infraestructura", name: "Infraestructura", count: 5 },
  { slug: "cultura", name: "Cultura", count: 7 },
  { slug: "ia", name: "Inteligencia artificial", count: 3 },
];

export const BREAKING_HEADLINES = [
  { title: "Gobierno anuncia plan de infraestructura para el Caribe", slug: "gobierno-anuncia-plan-infraestructura-caribe" },
  { title: "Selección nacional cierra preparativos antes del clasificatorio", slug: "seleccion-nacional-cierra-preparativos-clasificatorio" },
  { title: "LIDOM: Licey vence 4-3 a las Águilas en juego en vivo", slug: "liga-baloncesto-calendario-playoffs" },
  { title: "5G comercial llega a tres ciudades principales", slug: "5g-comercial-tres-ciudades" },
  { title: "Mercados reaccionan con optimismo a nuevo acuerdo comercial", slug: "mercados-optimismo-acuerdo-comercial" },
];
