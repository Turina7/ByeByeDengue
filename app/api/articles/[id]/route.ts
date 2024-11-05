import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  // Await the `params` to extract `id`
  const { id } = await context.params;

  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });
    if (!article) {
      return NextResponse.json({ error: "Artigo não encontrado" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar artigo" }, { status: 500 });
  }
}
