import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Buscar todos os artigos
      const articles = await prisma.article.findMany();
      res.status(200).json(articles);
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
      res.status(500).json({ error: "Erro ao buscar artigos" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// articles.ts
export const fetchArticles = async () => {
  // Simulação de fetch ou chamada real para sua API
  const response = await fetch("/api/articles"); // Altere conforme necessário
  if (!response.ok) throw new Error("Erro ao buscar artigos");
  return response.json();
};

