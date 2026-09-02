import { NextResponse } from "next/server";
import { z } from "zod";
import { articleExists } from "@/lib/queries";

const schema = z.object({
  articleId: z.string().min(1),
  authorName: z.string().min(2).max(80),
  authorEmail: z.string().email(),
  content: z.string().min(3).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (!(await articleExists(data.articleId))) {
      return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Comentario enviado. Será visible tras moderación.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
