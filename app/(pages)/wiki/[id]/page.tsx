"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/loading/Loading";
import styles from "./page.module.css";
import Button from "@/app/components/button/button";

type Article = {
  id: number;
  title: string;
  text: string;
  summary: string;
  createdAt: string;
  userId: number;
  keywords: string[]; // Inclui o campo de keywords
};

// Função para transformar keywords em hyperlinks
const insertKeywordLinks = (
  text: string,
  keywords: string[],
  onKeywordClick: (keyword: string) => void
): JSX.Element[] => {
  const parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi")); // Divide o texto pelas keywords

  return parts.map((part, index) =>
    keywords.includes(part) ? (
      <a
        key={index}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onKeywordClick(part); // Chamado ao clicar em uma keyword
        }}
        className={styles.link} // Aplica a classe local
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`);
        if (!response.ok) throw new Error("Artigo não encontrado");
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        setError("Erro ao carregar artigo");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (loading) return <Loading message="Carregando..." />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!article) return <div>Artigo não encontrado</div>;

  // Função chamada ao clicar em uma keyword
  const handleKeywordClick = (keyword: string) => {
    router.push(`/wiki?keyword=${encodeURIComponent(keyword)}`); // Redireciona para a página principal com filtro
  };

  return (
    <main className={styles.container}>
      <Button onClick={() => router.push("/wiki")}>Outros artigos</Button>
      <article className={styles.article}>
        <h1>{article.title}</h1>
        <div className={styles.metadata}>
          <span>Por: Autor ID {article.userId}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <p className={styles.summary}>{article.summary}</p>
        <div className={styles.content}>
          {insertKeywordLinks(article.text, article.keywords || [], handleKeywordClick)}
        </div>
      </article>
    </main>
  );
}
