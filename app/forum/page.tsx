"use client";

import { FC, useState } from "react";
import Head from "next/head";
import styles from "@/app/page.module.css";
import TabMenu from "@/app/components/tabMenu";

interface PageProps {
  title: string;
  content: string;
}

const Page: FC<PageProps> = ({ title, content }) => {
  // Define the activeTab state
  const [activeTab, setActiveTab] = useState<string>("Fórum");

  // Handler to change the active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
          <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
          <h1>Fórum</h1>
          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
