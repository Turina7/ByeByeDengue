"use client";

import styles from './page.module.css';
import { ProtectSection } from "@/app/components/homePageSections/protectSection/protectSection";
import { NewsSection } from "@/app/components/homePageSections/newsSection/newsSection";
import { CommunityPostsSection } from "@/app/components/homePageSections/communityPostsSection/communityPosts";
import { ExploreSection } from "@/app/components/homePageSections/exploreSection/exploreSection";
import { FeedbackSection } from "@/app/components/homePageSections/feedbackSection/feedbackSection"

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.mainTitle}>Juntos, vamos combater a dengue!</h1>
          <h2 className={styles.subTitle}>
            Junte-se a comunidade para lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque in bibendum ante. Donec sagittis ante
            vel dolor dapibus finibus. Nunc ut eleifend diam. Suspendisse ante
            eros, feugiat quis sollicitudin ac.
          </h2>
        </div>
        <ProtectSection />
        <NewsSection />
        <CommunityPostsSection />
        <ExploreSection />
        <FeedbackSection />
      </main>
    </div>
  );
}
