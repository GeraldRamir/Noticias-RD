import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    schema.parse(await req.json());
    return NextResponse.json({ message: "¡Gracias por suscribirte!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
