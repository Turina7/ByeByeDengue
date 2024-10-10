"use client";

import React from "react";
import Head from "next/head";
import styles from "@/app/page.module.css"; // Ensure this file exists with the necessary styling
import LinkArtigo from "@/app/components/linkArtigo/linkArtigo";

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
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
          <h2>WIKI</h2>
          <br/>
          <h3>Principais Artigos</h3>
          <br/>
          {/* LinkArtigo section */}
          <div className={styles.articleList}>
            <LinkArtigo title="Quem é Aécio ao Egípcio?" author="Guilherme Turina" date="08/10/2024" link="https://www.camara.leg.br/deputados/74646" />
            <br/>
            <LinkArtigo title="Tenho que tampar copo d'agua?" author="Tiago Marinho" date="30/09/2024" link="https://www.nadir.com.br/utensilios-domesticos/copo-de-vidro/copo-de-agua" />
            <br/>
            <LinkArtigo title="Sou fã de Pneu, como proceder?" author="João Paulo" date="15/02/1986" link="https://istoe.com.br/relembre-as-maiores-maluquices-feitas-por-bolsonaristas-em-atos-golpistas-de-2022/"/>
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

          {/* Content */}
          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
