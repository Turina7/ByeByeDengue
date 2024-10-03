"use client";

import Head from "next/head";
import styles from "@/app/page.module.css";

interface PageProps {
  title: string;
  content: string;
}

const Page: FC<PageProps> = ({ title, content }) => {
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
          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
