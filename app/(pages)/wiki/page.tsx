"use client";

import React from "react";
import Head from "next/head";
import styles from "@/app/page.module.css";
import LinkArtigo from "@/app/components/wikipageSections/linkArtigo/linkArtigo";

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
          <br/>
          <h2>Principais Artigos</h2>
          <br/>
          {/* LinkArtigo section */}
          <div className={styles.articleList}>
            <LinkArtigo title="Aedes Aedypti - O Vetor" author="Governo do Estado do Espirito Santo" date="08/10/2024" link={`${window.location.href}/aedes-aedypti`}  />
            <br/>
            <LinkArtigo title="Sintomas e Atitudes" author="Governo do Estado do Paraná (Adaptado)" date="11/10/2024" link={`${window.location.href}/sintomas-atitudes`} />
            <br/>
            <LinkArtigo title="Prevenção" author="Prefeitura de Itariri - SP" date="12/10/2024" link={`${window.location.href}/prevencao`} />
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
