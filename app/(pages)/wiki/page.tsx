"use client";

import React from "react";
import styles from "@/app/page.module.css";
import LinkArtigo from "@/app/components/wikipageSections/linkArtigo/linkArtigo";

interface Article {
  title: string;
  author: string;
  date: string;
  link: string;
}

const Page = () => {
  const mainArticles: Article[] = [
    {
      title: "Aedes Aegypti - O Vetor",
      author: "Governo do Estado do Espirito Santo",
      date: "08/10/2024",
      link: "wiki/aedes-aegypti"
    },
    // ... other articles
  ];

  const popularArticles: Article[] = [
    {
      title: "Dengue em portugal?",
      author: "Guilherme Turina",
      date: "08/10/2024",
      link: "https://www.publico.pt/2023/05/21/azul/noticia/portugal-olho-mosquitos-aedes-transmitem-doencas-infecciosas-2050302"
    },
    // ... other articles
  ];

  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.title}>Wiki da Dengue</h1>
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
  );
};

export default Page;