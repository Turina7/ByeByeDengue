"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import LinkArtigo from "@/app/components/wikipageSections/linkArtigo/linkArtigo";
import "./wiki.module.css"; // Importando o CSS

interface Article {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  userId: number;
}

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Erro ao buscar artigos");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError("Erro ao carregar artigos. Tente novamente mais tarde.");
        console.error("Erro ao buscar artigos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generic page layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="main">
        <section>
          <h1 className="title">{title}</h1>
          <h2>Principais Artigos</h2>
          
          {loading ? (
            <p>Carregando artigos...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="articleList">
              {articles.slice(0, 5).map((article) => (
                <LinkArtigo
                  key={article.id}
                  title={article.title}
                  author={`Autor ID ${article.userId}`}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  link={`/articles/${article.id}`}
                />
              ))}
            </div>
          )}

          <h2>Mais curtidos</h2>
          <LinkArtigo
            title="Dengue em portugal?"
            author="Guilherme Turina"
            date="08/10/2024"
            link="https://www.publico.pt/2023/05/21/azul/noticia/portugal-olho-mosquitos-aedes-transmitem-doencas-infecciosas-2050302"
          />
          <LinkArtigo
            title="Fuzil mata o mosquito?"
            author="Tiago Marinho"
            date="30/09/2024"
            link="https://pt.wikipedia.org/wiki/Fuzil"
          />
          <LinkArtigo
            title="Lei impactante sobre a dengue"
            author="João Paulo"
            date="15/02/1986"
            link="https://blog.lfg.com.br/legislacao/leis-absurdas/"
          />

          <p className="content">{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
