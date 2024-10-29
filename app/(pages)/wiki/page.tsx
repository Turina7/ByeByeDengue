"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/app/page.module.css";
import LinkArtigo from "@/app/components/wikipageSections/linkArtigo/linkArtigo";

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

  // Fetch para buscar os artigos da API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
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
          <br/>
          <h2>Principais Artigos</h2>
          <br/>
          <div className={styles.articleList}>
            {articles.map((article) => (
              <LinkArtigo
                key={article.id}
                title={article.title}
                author={`Autor ID ${article.userId}`} // Ajuste conforme os dados do autor, se tiver mais detalhes
                date={new Date(article.createdAt).toLocaleDateString()}
                link={`/wiki/${article.title.toLowerCase().replace(/ /g, "-")}`}  // Link baseado no título
              />
            ))}
          </div>
          <br/>
          <br/>
          <h2>Mais curtidos</h2>
          <br/>
          <LinkArtigo title="Dengue em portugal?" author="Guilherme Turina" date="08/10/2024" link="https://www.publico.pt/2023/05/21/azul/noticia/portugal-olho-mosquitos-aedes-transmitem-doencas-infecciosas-2050302" />
          <br/>
          <LinkArtigo title="Fuzil mata o mosquito?" author="Tiago Marinho" date="30/09/2024" link="https://pt.wikipedia.org/wiki/Fuzil" />
          <br/>
          <LinkArtigo title="Lei impactante sobre a dengue" author="João Paulo" date="15/02/1986" link="https://blog.lfg.com.br/legislacao/leis-absurdas/"/>

          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
