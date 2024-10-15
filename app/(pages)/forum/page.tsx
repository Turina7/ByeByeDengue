"use client";

import Head from "next/head";
import style from "@/app/components/forumCard/forumCard.module.css";
import styles from "@/app/page.module.css";
import ForumCard, { cardContent } from "@/app/components/forumCard/forumCard";
import { FC } from "react";

interface PageProps {
  title: string;
  content: string;
}

const Page: FC<PageProps> = ({ title, content }) => {

  // variável que armazenará postagens consultadas no banco
  const forumPosts: cardContent[] = [
    {
      header: "Tiago Marinho repostou:",
      post: "O Ministério da Saúde adverte: se seque bem após o banho, água parada em pneus dá dengue.",
      message: "O que banho tem a ver com pneu?",
      comments: [],
    },
    {
      header: "João Paulo comentou:",
      post: "Por favor, lembrem-se de não acumular água parada nos quintais.",
      message: "Muito importante, João!",
      comments: ["Falou e disse.","Pois é!", "Tem razão, João"],
    },
    {
      header: "Guilherme repostou:",
      post: "Prestem atenção nos focos do mosquito!",
      message: "Concordo!",
      comments: ["Verdade, todos temos que colaborar."],
    },
  ];

  const handleComment = () => {
    console.log('Comentar');
    // tratar para criar comentário
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generic page layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <section className={styles.section}>
          <h1 className={styles.title}>{title}</h1>
          <h1>Fórum</h1>
          <p>Este é o espaço da comunidade!
            Aqui você pode ver as postagens em alta e publicar sua mensagem ou comentário. Experimente!</p>
          <div className={style.cardContainer}>
            {forumPosts.map((post, index) => (
              <ForumCard
                key={index}
                cardContent={post}
                active={true}
                handleComment={handleComment}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
