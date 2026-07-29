import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const VISITOR_COOKIE = "cronica_vid";

const schema = z.object({
  articleId: z.string().min(1),
  categoryId: z.string().min(1),
});

function createVisitorId() {
  return `v_${crypto.randomUUID().replace(/-/g, "")}`;
}

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const jar = await cookies();
    let visitorId = jar.get(VISITOR_COOKIE)?.value;
    const isNew = !visitorId;
    if (!visitorId) visitorId = createVisitorId();

    const article = await prisma.article.findUnique({
      where: { id: body.articleId },
      select: { id: true, categoryId: true },
    });
    if (!article) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }

    // Deduplicate rapid refreshes for the same visitor+article (5 min)
    const recent = await prisma.articleView.findFirst({
      where: {
        visitorId,
        articleId: article.id,
        createdAt: { gte: new Date(Date.now() - 1000 * 60 * 5) },
      },
      select: { id: true },
    });

    if (!recent) {
      await prisma.$transaction([
        prisma.articleView.create({
          data: {
            articleId: article.id,
            categoryId: body.categoryId || article.categoryId,
            visitorId,
          },
        }),
        prisma.article.update({
          where: { id: article.id },
          data: { views: { increment: 1 } },
        }),
      ]);
    }

    const res = NextResponse.json({ ok: true, visitorId });
    if (isNew) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  } catch {
    return NextResponse.json({ error: "No se pudo registrar la visita" }, { status: 400 });
  }
}
