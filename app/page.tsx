"use client";

import styles from './page.module.css';
import { ProtectSection } from "@/app/components/homepageSections/protectSection/protectSection";
import { NewsSection } from "@/app/components/homepageSections/newsSection/newsSection";
import { CommunityPostsSection } from "@/app/components/homepageSections/communityPostsSection/communityPosts";
import { ExploreSection } from "@/app/components/homepageSections/exploreSection/exploreSection";
import { FeedbackSection } from "@/app/components/homepageSections/feedbackSection/feedbackSection";
import { SupportSection } from "@/app/components/homepageSections/supportSection/supportSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.mainTitle}>Juntos, vamos combater a dengue!</h1>
          <h2 className={styles.subTitle}>
          Descubra o ByeByeDengue! Nosso site é sua principal ferramenta na luta contra a dengue. 
          Aqui você encontra análises detalhadas sobre a doença, lê artigos, participa de fóruns interativos com outros 
          usuários para compartilhar experiências e dúvidas, além de explorar recursos exclusivos para prevenção 
          e combate ao mosquito. Juntos, podemos fazer a diferença! 🚫🦟
          </h2>
        </div>
        <ProtectSection />
        <NewsSection />
        <CommunityPostsSection />
        <ExploreSection />
        <FeedbackSection />
        <SupportSection />
      </main>
    </div>
  );
}
