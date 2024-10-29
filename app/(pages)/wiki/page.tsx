"use client";

<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect, useState } from "react";
import Head from "next/head";
>>>>>>> ccf90bd (API-midtest)
import styles from "@/app/page.module.css";
import LinkArtigo from "@/app/components/wikipageSections/linkArtigo/linkArtigo";

interface Article {
<<<<<<< HEAD
=======
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  userId: number;
}

interface PageProps {
>>>>>>> ccf90bd (API-midtest)
  title: string;
  author: string;
  date: string;
  link: string;
}

<<<<<<< HEAD
const Page = () => {
  const mainArticles: Article[] = [
    {
      title: "Aedes Aegypti - O Vetor",
      author: "Governo do Estado do Espirito Santo",
      date: "08/10/2024",
      link: "wiki/aedes-aegypti"
    },
    {
      title: "Sintomas e Atitudes",
      author: "Governo do Estado do Paraná (Adaptado)", 
      date: "11/10/2024",
      link: "wiki/sintomas-atitudes" 
    },
    {
      title: "Prevenção",
      author: "Prefeitura de Itariri - SP", 
      date: "12/10/2024", 
      link: "wiki/prevencao" 
    },
  ];

  const popularArticles: Article[] = [
    {
      title: "Dengue em portugal?",
      author: "Guilherme Turina",
      date: "08/10/2024",
      link: "https://www.publico.pt/2023/05/21/azul/noticia/portugal-olho-mosquitos-aedes-transmitem-doencas-infecciosas-2050302"
    },
    {
      title: "Fuzil mata o mosquito?",
      author: "Tiago Marinho",
      date: "30/09/2024",
      link: "https://pt.wikipedia.org/wiki/Fuzil" 
    },
    {
      title: "Lei impactante sobre a dengue",
      author: "João Paulo",
      date: "15/02/1986",
      link: "https://blog.lfg.com.br/legislacao/leis-absurdas/"
    },

  ];

  return (
    <main className={styles.main}>
      <section>
        <br/>
        <h2>Principais Artigos</h2> 
        <br/>
        <div className={styles.articleList}>
          {mainArticles.map((article, index) => (
            <React.Fragment key={index}>
              <LinkArtigo {...article} />
              {index < mainArticles.length - 1 && <br/>}
            </React.Fragment>
          ))}
        </div>
        
        <br/>
        <br/>
        <h2>Mais curtidos</h2>
        <br/>
        {popularArticles.map((article, index) => (
          <React.Fragment key={index}>
            <LinkArtigo {...article} />
            {index < popularArticles.length - 1 && <br/>}
          </React.Fragment>
        ))}
      </section>
    </main>
=======
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
>>>>>>> ccf90bd (API-midtest)
  );
};

export default Page;