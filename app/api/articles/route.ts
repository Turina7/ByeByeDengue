import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Exemplo usando Prisma como ORM; ajuste conforme seu banco de dados.

export async function GET() {
    try {
      console.log("Iniciando busca no banco de dados");
      const articles = await prisma.article.findMany();
      console.log("Artigos encontrados:", articles);
      return NextResponse.json(articles);
    } catch (error) {
      console.error("Erro ao buscar artigos no banco de dados:", error);
      return NextResponse.json({ error: "Erro ao buscar artigos" }, { status: 500 });
    }
  }
  
