"use client";

import TabMenu from "@/app/components/tabMenu"; // Import TabMenu component
import { useState } from "react";
import styles from "./page.module.css"; // Import CSS
import Button from "./components/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home"); // Initial active tab

  // Function to change the active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.ctas}>
      <main className={styles.main}>

        {/* TabMenu component, receives the active tab and the tab change function */}
        <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Dynamic content based on the active tab */}
        <div style={{ padding: "20px" }}>
          <h1>Home Page</h1>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
