"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import ArticleComponent from "@/app/components/wikipageSections/ArticleComponent";
import styles from "./wiki.module.css";

type Article = {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  text: string;
  userId: number;
};

const Page = () => {
  const title = "";
  const content = "";

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
        const data: Article[] = await response.json();
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

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>{title}</h1>
          <h2>Principais Artigos</h2>

          {loading ? (
            <p>Carregando artigos...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.articleList}>
              {articles.slice(0, 5).map((article) => (
                <ArticleComponent
                  key={article.id}
                  title={article.title}
                  author={`Autor ID ${article.userId}`}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  text={article.text}
                  summary={article.summary}
                />
              ))}
            </div>
          )}
          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
