import { PrismaClient, Role, ArticleStatus, BannerPosition, MediaType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.media.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@cronica.do",
      password,
      role: Role.ADMIN,
    },
  });

  const editor = await prisma.user.create({
    data: {
      name: "María Fernández",
      email: "editor@cronica.do",
      password: await bcrypt.hash("editor123", 10),
      role: Role.EDITOR,
    },
  });

  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Nacional", slug: "nacional", description: "Noticias del país", color: "#E10600" },
    }),
    prisma.category.create({
      data: { name: "Internacional", slug: "internacional", description: "Mundo", color: "#1D4ED8" },
    }),
    prisma.category.create({
      data: { name: "Deportes", slug: "deportes", description: "Competencias y atletas", color: "#059669" },
    }),
    prisma.category.create({
      data: { name: "Economía", slug: "economia", description: "Mercados y negocios", color: "#B45309" },
    }),
    prisma.category.create({
      data: { name: "Cultura", slug: "cultura", description: "Arte y entretenimiento", color: "#7C3AED" },
    }),
    prisma.category.create({
      data: { name: "Tecnología", slug: "tecnologia", description: "Innovación digital", color: "#0E7490" },
    }),
  ]);

  const now = new Date();

  const articles = [
    {
      title: "Gobierno anuncia plan de infraestructura para el Caribe",
      slug: "gobierno-anuncia-plan-infraestructura-caribe",
      excerpt: "La iniciativa contempla carreteras, puertos y conectividad digital en una inversión histórica.",
      content: `<p>El Ejecutivo presentó este lunes un ambicioso plan de infraestructura orientado a potenciar la competitividad regional durante la próxima década.</p><p>El paquete incluye modernización de vías principales, ampliación de puertos comerciales y un programa de fibra óptica para zonas rurales.</p><p>Según el ministerio de Hacienda, la ejecución se financiará con una combinación de fondos públicos y alianzas público-privadas.</p>`,
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
      categoryId: categories[0].id,
      featured: true,
      slider: true,
    },
    {
      title: "Selección nacional cierra preparativos antes del clasificatorio",
      slug: "seleccion-nacional-cierra-preparativos-clasificatorio",
      excerpt: "El cuerpo técnico confirmó la nómina definitiva y el esquema táctico para el debut.",
      content: `<p>La selección concluyó su último microciclo de entrenamiento con un partido de fogueo ante un combinado local.</p><p>El entrenador destacó la intensidad del grupo y la profundidad del banquillo de cara al torneo continental.</p>`,
      coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195eb4?w=1600&q=80",
      categoryId: categories[2].id,
      featured: true,
      slider: true,
    },
    {
      title: "Mercados reaccionan con optimismo a nuevo acuerdo comercial",
      slug: "mercados-optimismo-acuerdo-comercial",
      excerpt: "El índice bursátil local cerró al alza tras el anuncio bilateral.",
      content: `<p>Analistas coinciden en que el tratado abrirá oportunidades de exportación para agroindustria y manufactura ligera.</p><p>Las cámaras empresariales celebraron la reducción arancelaria gradual prevista para los próximos cinco años.</p>`,
      coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
      categoryId: categories[3].id,
      featured: true,
      slider: true,
    },
    {
      title: "Festival de cine atrae a más de 40 mil espectadores",
      slug: "festival-cine-40-mil-espectadores",
      excerpt: "La edición de este año consolidó a la ciudad como referente cultural del Caribe.",
      content: `<p>Con proyecciones al aire libre, talleres y una competencia oficial de 28 títulos, el festival superó todas las expectativas de asistencia.</p>`,
      coverImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
      categoryId: categories[4].id,
      featured: false,
      slider: false,
    },
    {
      title: "Startups locales levantan ronda récord de inversión",
      slug: "startups-locales-ronda-record-inversion",
      excerpt: "Tres empresas de software y fintech captaron capital semilla por encima de los US$12 millones.",
      content: `<p>El ecosistema emprendedor continúa su expansión con fondos regionales interesados en talento técnico y soluciones exportables.</p>`,
      coverImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80",
      categoryId: categories[5].id,
      featured: true,
      slider: false,
    },
    {
      title: "Cumbre climática define metas para islas del Caribe",
      slug: "cumbre-climatica-metas-islas-caribe",
      excerpt: "Los gobiernos participantes acordaron un fondo común de resiliencia ante huracanes.",
      content: `<p>La declaración final enfatiza energías renovables, protección costera y sistemas de alerta temprana compartidos.</p>`,
      coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600&q=80",
      categoryId: categories[1].id,
      featured: false,
      slider: false,
    },
    {
      title: "Nuevo hospital regional inicia operaciones en el Cibao",
      slug: "nuevo-hospital-regional-inicia-operaciones-cibao",
      excerpt: "La obra ampliará la capacidad de atención especializada para más de 800 mil habitantes.",
      content: `<p>El centro cuenta con unidades de terapia intensiva, quirófanos modernos y un laboratorio de alta complejidad.</p>`,
      coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
      categoryId: categories[0].id,
      featured: false,
      slider: false,
    },
    {
      title: "Turismo registra temporada alta con ocupación histórica",
      slug: "turismo-temporada-alta-ocupacion-historica",
      excerpt: "Hoteles de la costa norte reportan niveles de ocupación superiores al 90%.",
      content: `<p>El ministerio de Turismo atribuye el resultado a la conectividad aérea y campañas de promoción internacional.</p>`,
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
      categoryId: categories[0].id,
      featured: false,
      slider: false,
    },
  ];

  for (const [index, article] of articles.entries()) {
    await prisma.article.create({
      data: {
        ...article,
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(now.getTime() - index * 3600_000 * 6),
        authorId: index % 2 === 0 ? admin.id : editor.id,
        seoTitle: article.title,
        seoDescription: article.excerpt,
      },
    });
  }

  await prisma.banner.createMany({
    data: [
      {
        title: "Publicidad principal",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
        linkUrl: "https://example.com",
        position: BannerPosition.HOMEPAGE,
        active: true,
      },
      {
        title: "Banner lateral",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
        linkUrl: "https://example.com",
        position: BannerPosition.SIDEBAR,
        active: true,
      },
    ],
  });

  await prisma.media.createMany({
    data: [
      {
        filename: "portada-ciudad.jpg",
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
        type: MediaType.IMAGE,
        mimeType: "image/jpeg",
        alt: "Vista urbana",
        uploadedById: admin.id,
      },
      {
        filename: "informe-anual.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        type: MediaType.DOCUMENT,
        mimeType: "application/pdf",
        alt: "Informe anual",
        uploadedById: admin.id,
      },
    ],
  });

  await prisma.newsletterSubscriber.create({
    data: { email: "lector@ejemplo.com" },
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "siteName", value: "CRÓNICA" },
      { key: "tagline", value: "Noticias que importan" },
      { key: "contactEmail", value: "redaccion@cronica.do" },
      { key: "contactPhone", value: "+1 (809) 555-0100" },
      { key: "address", value: "Santo Domingo, República Dominicana" },
      { key: "facebook", value: "https://facebook.com" },
      { key: "twitter", value: "https://x.com" },
      { key: "instagram", value: "https://instagram.com" },
    ],
  });

  console.log("Seed completado.");
  console.log("Admin: admin@cronica.do / admin123");
  console.log("Editor: editor@cronica.do / editor123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
