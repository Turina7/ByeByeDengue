import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return NextResponse.json({ error: "Artigo não encontrado" }, { status: 404 });
    }

    // Converte a string de keywords para um array
    const response = {
      ...article,
      keywords: article.keywords ? article.keywords.split(",") : [], // Separa a string em um array
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar artigo" }, { status: 500 });
  }
}
