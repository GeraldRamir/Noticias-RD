export type MockAuthor = { id: string; name: string };

export type MockCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  updatedAt: Date;
};

export type MockComment = {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  createdAt: Date;
};

export type MockArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: "PUBLISHED";
  featured: boolean;
  slider: boolean;
  views: number;
  seoTitle: string;
  seoDescription: string;
  publishedAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: MockCategory;
  author: MockAuthor;
  comments: MockComment[];
};

export type MockBanner = {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string | null;
  position: "HEADER" | "SIDEBAR" | "HOMEPAGE" | "ARTICLE" | "FOOTER";
  active: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
};

export type MockMedia = {
  id: string;
  filename: string;
  url: string;
  type: "IMAGE" | "DOCUMENT";
  mimeType: string;
  alt: string;
  createdAt: Date;
};

export const MOCK_AUTHORS: MockAuthor[] = [
  { id: "author-1", name: "Administrador" },
  { id: "author-2", name: "María Fernández" },
  { id: "author-3", name: "Carlos Méndez" },
];

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "cat-nacional",
    name: "Nacional",
    slug: "nacional",
    description: "Política, sociedad y desarrollo del país",
    color: "#E10600",
    updatedAt: new Date("2026-08-20"),
  },
  {
    id: "cat-internacional",
    name: "Internacional",
    slug: "internacional",
    description: "Actualidad global y relaciones exteriores",
    color: "#1D4ED8",
    updatedAt: new Date("2026-08-19"),
  },
  {
    id: "cat-deportes",
    name: "Deportes",
    slug: "deportes",
    description: "Competencias, atletas y resultados en vivo",
    color: "#059669",
    updatedAt: new Date("2026-08-21"),
  },
  {
    id: "cat-economia",
    name: "Economía",
    slug: "economia",
    description: "Mercados, negocios y finanzas personales",
    color: "#B45309",
    updatedAt: new Date("2026-08-18"),
  },
  {
    id: "cat-cultura",
    name: "Cultura",
    slug: "cultura",
    description: "Arte, cine, música y entretenimiento",
    color: "#7C3AED",
    updatedAt: new Date("2026-08-17"),
  },
  {
    id: "cat-tecnologia",
    name: "Tecnología",
    slug: "tecnologia",
    description: "Innovación digital, IA y startups",
    color: "#0E7490",
    updatedAt: new Date("2026-08-22"),
  },
];

const cat = (slug: string) => MOCK_CATEGORIES.find((c) => c.slug === slug)!;
const author = (index: number) => MOCK_AUTHORS[index % MOCK_AUTHORS.length];

function articleContent(paragraphs: string[], quote?: string) {
  const body = paragraphs.map((p) => `<p>${p}</p>`).join("");
  const blockquote = quote ? `<blockquote><p>${quote}</p></blockquote>` : "";
  return `${body}${blockquote}<p><em>Redacción CRÓNICA</em></p>`;
}

const baseDate = new Date("2026-08-22T08:00:00");

function publishedAt(hoursAgo: number) {
  return new Date(baseDate.getTime() - hoursAgo * 3600_000);
}

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: "art-1",
    title: "Gobierno anuncia plan de infraestructura para el Caribe",
    slug: "gobierno-anuncia-plan-infraestructura-caribe",
    excerpt:
      "La iniciativa contempla carreteras, puertos y conectividad digital en una inversión histórica de más de RD$180 mil millones.",
    content: articleContent(
      [
        "El Ejecutivo presentó este lunes un ambicioso plan de infraestructura orientado a potenciar la competitividad regional durante la próxima década. La rueda de prensa, celebrada en el Palacio Nacional, reunió a ministros, empresarios y representantes de organismos multilaterales.",
        "El paquete incluye modernización de vías principales, ampliación de puertos comerciales y un programa de fibra óptica para zonas rurales que busca cerrar la brecha digital en más de 400 comunidades.",
        "Según el ministerio de Hacienda, la ejecución se financiará con una combinación de fondos públicos y alianzas público-privadas. Se estima la creación de 45 mil empleos directos en los primeros tres años.",
        "Los gobernadores de las provincias costeras celebraron la prioridad otorgada a los corredores logísticos que conectan puertos con centros de producción agrícola e industrial.",
      ],
      "Esta inversión no es solo concreto y asfalto: es la base para que nuestras regiones compitan en el siglo XXI."
    ),
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: true,
    views: 8420,
    seoTitle: "Plan de infraestructura Caribe — CRÓNICA",
    seoDescription: "Inversión histórica en carreteras, puertos y conectividad digital.",
    publishedAt: publishedAt(2),
    updatedAt: publishedAt(2),
    categoryId: cat("nacional").id,
    category: cat("nacional"),
    author: author(0),
    comments: [
      {
        id: "c-1",
        articleId: "art-1",
        authorName: "Pedro Santana",
        authorEmail: "pedro@ejemplo.com",
        content: "Esperemos que esta vez la ejecución sea transparente y llegue a las provincias que más lo necesitan.",
        approved: true,
        createdAt: publishedAt(1),
      },
      {
        id: "c-2",
        articleId: "art-1",
        authorName: "Ana Lucía Reyes",
        authorEmail: "ana@ejemplo.com",
        content: "Muy buena noticia para el empleo local. Ojalá incluyan capacitación técnica para jóvenes.",
        approved: true,
        createdAt: publishedAt(0.5),
      },
    ],
  },
  {
    id: "art-2",
    title: "Selección nacional cierra preparativos antes del clasificatorio",
    slug: "seleccion-nacional-cierra-preparativos-clasificatorio",
    excerpt:
      "El cuerpo técnico confirmó la nómina definitiva de 26 jugadores y el esquema táctico 4-3-3 para el debut del viernes.",
    content: articleContent(
      [
        "La selección concluyó su último microciclo de entrenamiento con un partido de fogueo ante un combinado local que terminó 2-1 a favor del equipo nacional.",
        "El entrenador destacó la intensidad del grupo y la profundidad del banquillo de cara al torneo continental. El arquero titular regresó tras superar una molestia muscular.",
        "Miles de aficionados se aglomeraron en las gradas del estadio olímpico para despedir al equipo antes del viaje. La federación confirmó transmisión en vivo del partido inaugural.",
      ],
      "Vamos con la mentalidad de ganador; el país entero está con nosotros."
    ),
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: true,
    views: 12150,
    seoTitle: "Selección nacional — clasificatorio",
    seoDescription: "Nómina definitiva y esquema táctico confirmados.",
    publishedAt: publishedAt(4),
    updatedAt: publishedAt(4),
    categoryId: cat("deportes").id,
    category: cat("deportes"),
    author: author(1),
    comments: [
      {
        id: "c-3",
        articleId: "art-2",
        authorName: "Miguel Ángel",
        authorEmail: "miguel@ejemplo.com",
        content: "¡Vamos con toda! Esta generación tiene hambre de gloria.",
        approved: true,
        createdAt: publishedAt(3),
      },
    ],
  },
  {
    id: "art-3",
    title: "Mercados reaccionan con optimismo a nuevo acuerdo comercial",
    slug: "mercados-optimismo-acuerdo-comercial",
    excerpt:
      "El índice bursátil local cerró al alza un 2.4% tras el anuncio del tratado bilateral con mercados clave de exportación.",
    content: articleContent(
      [
        "Analistas coinciden en que el tratado abrirá oportunidades de exportación para agroindustria y manufactura ligera durante los próximos cinco años.",
        "Las cámaras empresariales celebraron la reducción arancelaria gradual prevista. El sector textil fue uno de los más beneficiados en la negociación.",
        "El Banco Central indicó que el acuerdo podría contribuir a la estabilidad cambiaria si se cumplen las metas de diversificación exportadora.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: true,
    views: 5680,
    seoTitle: "Acuerdo comercial impulsa mercados",
    seoDescription: "Índice bursátil sube tras anuncio bilateral.",
    publishedAt: publishedAt(6),
    updatedAt: publishedAt(6),
    categoryId: cat("economia").id,
    category: cat("economia"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-4",
    title: "Festival de cine atrae a más de 40 mil espectadores",
    slug: "festival-cine-40-mil-espectadores",
    excerpt:
      "La edición 2026 consolidó a Santo Domingo como referente cultural del Caribe con proyecciones al aire libre y talleres gratuitos.",
    content: articleContent(
      [
        "Con proyecciones al aire libre, talleres y una competencia oficial de 28 títulos, el festival superó todas las expectativas de asistencia.",
        "Películas de diez países compitieron por el premio Coral de Oro. Una coproducción local ganó el reconocimiento a mejor dirección debut.",
        "La alcaldía anunció que el evento volverá el próximo año con una edición ampliada que incluirá realidad virtual y documentales interactivos.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: false,
    views: 3210,
    seoTitle: "Festival de cine 2026 — récord de asistencia",
    seoDescription: "Más de 40 mil espectadores en la edición caribeña.",
    publishedAt: publishedAt(8),
    updatedAt: publishedAt(8),
    categoryId: cat("cultura").id,
    category: cat("cultura"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-5",
    title: "Startups locales levantan ronda récord de inversión",
    slug: "startups-locales-ronda-record-inversion",
    excerpt:
      "Tres empresas de software y fintech captaron capital semilla por encima de los US$12 millones en una sola semana.",
    content: articleContent(
      [
        "El ecosistema emprendedor continúa su expansión con fondos regionales interesados en talento técnico y soluciones exportables.",
        "Una plataforma de pagos digitales lideró la ronda con US$7 millones. Dos startups de salud y logística completaron el resto de la captación.",
        "El ministerio de Industria anunció un programa de aceleración con mentores internacionales y acceso a nube gratuita por un año.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: false,
    views: 4890,
    seoTitle: "Startups locales — ronda récord",
    seoDescription: "Fintech y software captan US$12M en capital semilla.",
    publishedAt: publishedAt(10),
    updatedAt: publishedAt(10),
    categoryId: cat("tecnologia").id,
    category: cat("tecnologia"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-6",
    title: "Cumbre climática define metas para islas del Caribe",
    slug: "cumbre-climatica-metas-islas-caribe",
    excerpt:
      "Los gobiernos participantes acordaron un fondo común de resiliencia ante huracanes por US$500 millones.",
    content: articleContent(
      [
        "La declaración final enfatiza energías renovables, protección costera y sistemas de alerta temprana compartidos entre 14 naciones insulares.",
        "Expertos climáticos presentaron proyecciones que sitúan al Caribe entre las regiones más vulnerables del planeta en las próximas dos décadas.",
        "Organizaciones ambientales calificaron el acuerdo como un paso histórico, aunque pidieron plazos más agresivos para la transición energética.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 2940,
    seoTitle: "Cumbre climática Caribe",
    seoDescription: "Fondo de resiliencia ante huracanes acordado.",
    publishedAt: publishedAt(12),
    updatedAt: publishedAt(12),
    categoryId: cat("internacional").id,
    category: cat("internacional"),
    author: author(0),
    comments: [],
  },
  {
    id: "art-7",
    title: "Nuevo hospital regional inicia operaciones en el Cibao",
    slug: "nuevo-hospital-regional-inicia-operaciones-cibao",
    excerpt:
      "La obra ampliará la capacidad de atención especializada para más de 800 mil habitantes de cinco provincias.",
    content: articleContent(
      [
        "El centro cuenta con 120 camas, unidades de terapia intensiva, quirófanos modernos y un laboratorio de alta complejidad.",
        "Autoridades de salud indicaron que el hospital reducirá tiempos de espera en cardiología, oncología y traumatología.",
        "La comunidad local celebró la inauguración con una jornada de chequeos gratuitos y vacunación infantil.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 4120,
    seoTitle: "Hospital regional Cibao inaugura",
    seoDescription: "Atención especializada para 800 mil habitantes.",
    publishedAt: publishedAt(14),
    updatedAt: publishedAt(14),
    categoryId: cat("nacional").id,
    category: cat("nacional"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-8",
    title: "Turismo registra temporada alta con ocupación histórica",
    slug: "turismo-temporada-alta-ocupacion-historica",
    excerpt:
      "Hoteles de la costa norte reportan niveles de ocupación superiores al 92% durante julio y agosto.",
    content: articleContent(
      [
        "El ministerio de Turismo atribuye el resultado a la conectividad aérea ampliada y campañas de promoción internacional en mercados europeos.",
        "Los arribos por cruceros también crecieron un 18% respecto al año anterior, con Puerto Plata como principal puerto de escala.",
        "Pequeños hospedadores reportan reservas completas hasta mediados de septiembre, impulsados por el turismo de experiencias.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 3780,
    seoTitle: "Turismo — ocupación histórica",
    seoDescription: "Hoteles reportan más del 92% de ocupación.",
    publishedAt: publishedAt(16),
    updatedAt: publishedAt(16),
    categoryId: cat("nacional").id,
    category: cat("nacional"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-9",
    title: "ONU aprueba resolución sobre seguridad alimentaria en América Latina",
    slug: "onu-resolucion-seguridad-alimentaria-latam",
    excerpt:
      "El texto promueve cooperación regional para reducir el hambre en un 30% para 2030.",
    content: articleContent(
      [
        "La resolución fue aprobada con el respaldo de 28 países de la región y establece un mecanismo de seguimiento trimestral.",
        "Organizaciones humanitarias destacaron la inclusión de programas escolares de alimentación y apoyo a pequeños productores.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 2150,
    seoTitle: "ONU — seguridad alimentaria Latam",
    seoDescription: "Resolución busca reducir el hambre un 30%.",
    publishedAt: publishedAt(18),
    updatedAt: publishedAt(18),
    categoryId: cat("internacional").id,
    category: cat("internacional"),
    author: author(0),
    comments: [],
  },
  {
    id: "art-10",
    title: "Liga de baloncesto local define calendario de playoffs",
    slug: "liga-baloncesto-calendario-playoffs",
    excerpt:
      "Los cuatro mejores equipos de la temporada regular disputarán la semifinal a partir del 1 de septiembre.",
    content: articleContent(
      [
        "El campeón defensor llega como favorito tras una racha de 12 victorias consecutivas en la fase regular.",
        "La liga confirmó transmisiones en streaming y entradas agotadas para la serie inaugural en el pabellón principal.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 6540,
    seoTitle: "Playoffs liga de baloncesto",
    seoDescription: "Semifinales arrancan el 1 de septiembre.",
    publishedAt: publishedAt(20),
    updatedAt: publishedAt(20),
    categoryId: cat("deportes").id,
    category: cat("deportes"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-11",
    title: "Inflación moderada: precios suben 0.3% en julio",
    slug: "inflacion-moderada-julio",
    excerpt:
      "El índice de precios al consumidor muestra desaceleración gracias a la estabilidad de los alimentos básicos.",
    content: articleContent(
      [
        "El Banco Central mantuvo la tasa de referencia sin cambios y proyecta inflación anual por debajo del 4%.",
        "Economistas advierten sobre presiones en energía importada que podrían afectar el segundo semestre.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 2890,
    seoTitle: "Inflación julio 2026",
    seoDescription: "IPC sube 0.3% con alimentos estables.",
    publishedAt: publishedAt(22),
    updatedAt: publishedAt(22),
    categoryId: cat("economia").id,
    category: cat("economia"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-12",
    title: "Museo de arte contemporáneo inaugura exposición permanente",
    slug: "museo-arte-exposicion-permanente",
    excerpt:
      "La colección reúne 120 obras de artistas caribeños y latinoamericanos de las últimas cinco décadas.",
    content: articleContent(
      [
        "La curaduría incluye instalaciones interactivas, pintura, escultura y arte digital en cinco salas temáticas.",
        "La entrada será gratuita los domingos para estudiantes y familias, como parte del programa de democratización cultural.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1460661419201-fd41ce864794?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 1980,
    seoTitle: "Museo — exposición permanente",
    seoDescription: "120 obras de artistas caribeños en nueva sala.",
    publishedAt: publishedAt(24),
    updatedAt: publishedAt(24),
    categoryId: cat("cultura").id,
    category: cat("cultura"),
    author: author(0),
    comments: [],
  },
  {
    id: "art-13",
    title: "Inteligencia artificial llega a las aulas públicas",
    slug: "inteligencia-artificial-aulas-publicas",
    excerpt:
      "Un piloto en 50 escuelas usará tutores virtuales para reforzar matemáticas y lectura.",
    content: articleContent(
      [
        "El ministerio de Educación firmó un convenio con empresas tecnológicas para implementar herramientas de IA adaptativas.",
        "Los docentes recibirán capacitación de 40 horas antes del inicio del ciclo escolar en octubre.",
        "Padres y especialistas debaten el equilibrio entre innovación y privacidad de datos estudiantiles.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
    status: "PUBLISHED",
    featured: true,
    slider: false,
    views: 5230,
    seoTitle: "IA en escuelas públicas",
    seoDescription: "Piloto con tutores virtuales en 50 centros.",
    publishedAt: publishedAt(26),
    updatedAt: publishedAt(26),
    categoryId: cat("tecnologia").id,
    category: cat("tecnologia"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-14",
    title: "Congreso debate reforma al sistema de pensiones",
    slug: "congreso-debate-reforma-pensiones",
    excerpt:
      "La propuesta busca garantizar sostenibilidad actuarial sin reducir beneficios de jubilados actuales.",
    content: articleContent(
      [
        "Líderes sindicales y empresariales participaron en audiencias públicas durante tres semanas de deliberación.",
        "El proyecto incluye incentivos fiscales para ahorro voluntario y mayor fiscalización de fondos de pensiones privados.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 3450,
    seoTitle: "Reforma de pensiones en debate",
    seoDescription: "Congreso analiza sostenibilidad del sistema.",
    publishedAt: publishedAt(28),
    updatedAt: publishedAt(28),
    categoryId: cat("nacional").id,
    category: cat("nacional"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-15",
    title: "Eurocopa femenina: semifinalistas definidas tras jornada épica",
    slug: "eurocopa-femenina-semifinalistas",
    excerpt:
      "Dos partidos de infarto definieron el cuadro final con goles en tiempo añadido.",
    content: articleContent(
      [
        "Las semifinales se disputarán el fin de semana con transmisión global y récord de audiencia en redes sociales.",
        "Analistas destacan el crecimiento del fútbol femenino europeo y su impacto en patrocinios deportivos.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 2670,
    seoTitle: "Eurocopa femenina — semifinales",
    seoDescription: "Cuadro final definido con goles en tiempo añadido.",
    publishedAt: publishedAt(30),
    updatedAt: publishedAt(30),
    categoryId: cat("internacional").id,
    category: cat("internacional"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-16",
    title: "Maratonista local bate récord nacional en 10K",
    slug: "maratonista-bate-record-10k",
    excerpt:
      "Cruzó la meta en 28 minutos y 42 segundos durante el campeonato nacional de atletismo.",
    content: articleContent(
      [
        "El atleta de 24 años superó la marca anterior por 11 segundos y clasificó al campeonato panamericano.",
        "Entrenadores del equipo nacional celebraron la proyección olímpica del corredor para Los Ángeles 2028.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 1890,
    seoTitle: "Récord nacional 10K",
    seoDescription: "Maratonista clasifica al panamericano.",
    publishedAt: publishedAt(32),
    updatedAt: publishedAt(32),
    categoryId: cat("deportes").id,
    category: cat("deportes"),
    author: author(0),
    comments: [],
  },
  {
    id: "art-17",
    title: "Banco central mantiene tasa de interés en 7.75%",
    slug: "banco-central-mantiene-tasa-interes",
    excerpt:
      "La decisión busca equilibrar control inflacionario con estímulo al crédito productivo.",
    content: articleContent(
      [
        "El comité monetario señaló señales mixtas en la economía global y volatilidad en materias primas.",
        "Analistas esperan posible recorte en el cuarto trimestre si la inflación continúa moderándose.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 2340,
    seoTitle: "Banco Central mantiene tasa",
    seoDescription: "Tasa de referencia se mantiene en 7.75%.",
    publishedAt: publishedAt(34),
    updatedAt: publishedAt(34),
    categoryId: cat("economia").id,
    category: cat("economia"),
    author: author(1),
    comments: [],
  },
  {
    id: "art-18",
    title: "Artista urbano llena estadio en concierto sold out",
    slug: "artista-urbano-concierto-sold-out",
    excerpt:
      "Más de 35 mil personas asistieron al show que mezcló merengue, dembow y visuales inmersivos.",
    content: articleContent(
      [
        "El concierto marcó el regreso del artista tras tres años de pausa y confirmó fechas adicionales por demanda.",
        "Críticos musicales elogiaron la producción escénica y el mensaje de orgullo cultural en el repertorio.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 7120,
    seoTitle: "Concierto sold out — artista urbano",
    seoDescription: "35 mil personas en show histórico.",
    publishedAt: publishedAt(36),
    updatedAt: publishedAt(36),
    categoryId: cat("cultura").id,
    category: cat("cultura"),
    author: author(2),
    comments: [],
  },
  {
    id: "art-19",
    title: "5G comercial llega a tres ciudades principales",
    slug: "5g-comercial-tres-ciudades",
    excerpt:
      "Operadores activan la red de quinta generación con planes desde RD$1,500 mensuales.",
    content: articleContent(
      [
        "La cobertura inicial incluye zonas empresariales, universidades y corredores turísticos de alta densidad.",
        "Expertos anticipan impacto en telemedicina, logística inteligente y educación a distancia.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 4560,
    seoTitle: "5G comercial en tres ciudades",
    seoDescription: "Red de quinta generación ya disponible.",
    publishedAt: publishedAt(38),
    updatedAt: publishedAt(38),
    categoryId: cat("tecnologia").id,
    category: cat("tecnologia"),
    author: author(0),
    comments: [],
  },
  {
    id: "art-20",
    title: "Programa de vivienda social entrega 500 unidades nuevas",
    slug: "vivienda-social-500-unidades",
    excerpt:
      "Familias de ingresos medios recibieron llaves en un desarrollo con áreas verdes y centros comunitarios.",
    content: articleContent(
      [
        "El proyecto incluye transporte subsidiado, guarderías y espacios deportivos dentro del complejo habitacional.",
        "Autoridades anunciaron una segunda fase con 800 unidades adicionales para finales de 2027.",
      ]
    ),
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    status: "PUBLISHED",
    featured: false,
    slider: false,
    views: 3120,
    seoTitle: "500 viviendas sociales entregadas",
    seoDescription: "Programa habitacional beneficia familias de ingresos medios.",
    publishedAt: publishedAt(40),
    updatedAt: publishedAt(40),
    categoryId: cat("nacional").id,
    category: cat("nacional"),
    author: author(1),
    comments: [],
  },
];

export const MOCK_BANNERS: MockBanner[] = [
  {
    id: "banner-1",
    title: "Universidad Tecnológica — Inscripciones abiertas 2026",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=970&h=250&fit=crop&q=80",
    linkUrl: "https://example.com",
    position: "HOMEPAGE",
    active: true,
    startDate: null,
    endDate: null,
    createdAt: new Date("2026-08-01"),
  },
  {
    id: "banner-2",
    title: "Seguros Confianza — Protege lo que más valoras",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=250&fit=crop&q=80",
    linkUrl: "https://example.com",
    position: "SIDEBAR",
    active: true,
    startDate: null,
    endDate: null,
    createdAt: new Date("2026-08-01"),
  },
  {
    id: "banner-3",
    title: "Inversiones Caribe — Asesoría financiera personalizada",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=600&fit=crop&q=80",
    linkUrl: "https://example.com",
    position: "ARTICLE",
    active: true,
    startDate: null,
    endDate: null,
    createdAt: new Date("2026-08-01"),
  },
  {
    id: "banner-4",
    title: "Banco Nacional — Tu futuro financiero comienza hoy",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=728&h=90&fit=crop&q=80",
    linkUrl: "https://example.com",
    position: "HEADER",
    active: true,
    startDate: null,
    endDate: null,
    createdAt: new Date("2026-08-01"),
  },
];

export const MOCK_MEDIA: MockMedia[] = [
  {
    id: "media-1",
    filename: "portada-ciudad.jpg",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Vista aérea del centro histórico al atardecer",
    createdAt: new Date("2026-07-15"),
  },
  {
    id: "media-2",
    filename: "redaccion-cronica.jpg",
    url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Sala de redacción de CRÓNICA durante cobertura especial",
    createdAt: new Date("2026-07-20"),
  },
  {
    id: "media-3",
    filename: "cobertura-deportiva.jpg",
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba7955?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Fotógrafo en acción durante partido de la selección",
    createdAt: new Date("2026-08-01"),
  },
  {
    id: "media-4",
    filename: "entrevista-politica.jpg",
    url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Entrevista exclusiva en el Congreso Nacional",
    createdAt: new Date("2026-08-05"),
  },
  {
    id: "media-5",
    filename: "festival-cultura.jpg",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Público en el festival de cine al aire libre",
    createdAt: new Date("2026-08-10"),
  },
  {
    id: "media-6",
    filename: "startup-demo-day.jpg",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    type: "IMAGE",
    mimeType: "image/jpeg",
    alt: "Demo day de startups tecnológicas locales",
    createdAt: new Date("2026-08-12"),
  },
  {
    id: "media-7",
    filename: "informe-anual-2025.pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "DOCUMENT",
    mimeType: "application/pdf",
    alt: "Informe anual de audiencia CRÓNICA 2025",
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "media-8",
    filename: "guia-redaccion.pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "DOCUMENT",
    mimeType: "application/pdf",
    alt: "Guía editorial para colaboradores",
    createdAt: new Date("2026-03-05"),
  },
  {
    id: "media-9",
    filename: "media-kit-cronica.pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "DOCUMENT",
    mimeType: "application/pdf",
    alt: "Media kit publicitario CRÓNICA",
    createdAt: new Date("2026-06-01"),
  },
];

export const MOCK_SETTINGS: Record<string, string> = {
  siteName: "CRÓNICA",
  tagline: "Noticias que importan",
  contactEmail: "redaccion@cronica.do",
  contactPhone: "+1 (809) 555-0100",
  address: "Av. Winston Churchill 1099, Piantini, Santo Domingo, República Dominicana",
  hours: "Lunes a viernes, 8:00 a.m. – 6:00 p.m.",
  facebook: "https://facebook.com/cronica",
  twitter: "https://x.com/cronica",
  instagram: "https://instagram.com/cronica",
  youtube: "https://youtube.com/@cronica",
  whatsapp: "+18095550100",
};

export const POPULAR_SEARCHES = [
  "selección nacional",
  "inflación",
  "turismo",
  "inteligencia artificial",
  "festival de cine",
  "5G",
];
