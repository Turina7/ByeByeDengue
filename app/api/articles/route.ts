import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Exemplo usando Prisma como ORM; ajuste conforme seu banco de dados.

export async function GET() {
  try {
    console.log("Iniciando busca no banco de dados");
    const articles = await prisma.article.findMany();
    console.log("Artigos encontrados");

    // Processa os artigos para garantir que `keywords` seja um array
    const processedArticles = articles.map((article) => ({
      ...article,
      keywords: article.keywords ? article.keywords.split(",") : [], // Converte string em array
    }));

    return NextResponse.json(processedArticles);
  } catch (error) {
    console.error("Erro ao buscar artigos no banco de dados:", error);
    return NextResponse.json({ error: "Erro ao buscar artigos" }, { status: 500 });
  }
}
