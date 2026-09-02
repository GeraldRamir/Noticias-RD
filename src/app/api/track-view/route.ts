import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { articleExists } from "@/lib/queries";
import { MOCK_ARTICLES } from "@/lib/mock-data";

const VISITOR_COOKIE = "cronica_vid";
const HISTORY_COOKIE = "cronica_history";

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

    if (!(await articleExists(body.articleId))) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }

    const article = MOCK_ARTICLES.find((a) => a.id === body.articleId);
    const categorySlug = article?.category.slug;
    const existingHistory = jar.get(HISTORY_COOKIE)?.value?.split(",").filter(Boolean) ?? [];
    const updatedHistory = categorySlug
      ? [categorySlug, ...existingHistory.filter((s) => s !== categorySlug)].slice(0, 5)
      : existingHistory;

    const res = NextResponse.json({ ok: true, visitorId });
    if (isNew) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    if (categorySlug) {
      res.cookies.set(HISTORY_COOKIE, updatedHistory.join(","), {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return res;
  } catch {
    return NextResponse.json({ error: "No se pudo registrar la visita" }, { status: 400 });
  }
}
