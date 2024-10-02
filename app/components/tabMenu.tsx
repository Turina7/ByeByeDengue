"use client"; // Ensure the component is treated as a client component

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import styles from "./tabMenu.module.css";
import Image from "next/image"; // Import Image component from Next.js
import logo from "@/app/images/Logo.png"; // Import the logo

interface TabMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["Home", "Wiki", "Mapas", "Denúncias", "Math", "FAQ"];
  const router = useRouter(); // Initialize the router

  const handleTabClick = (tab: string) => {
    onTabChange(tab); // Trigger the parent state changes

    // Routing logic for Home and other tabs
    if (tab === "Home") {
      router.push("/"); // Navigate to root for Home
    } else {
      router.push(`/${tab.toLowerCase()}`); // Navigate to the respective route
    }
  };

  return (
    <div className={styles.tabMenu}>
      {/* Logo centered */}
      <div className={styles.logoContainer}>
        <Image
          src={logo}
          alt="Logo"
          className={styles.logo}
          layout="intrinsic"
          width={180}
          height={90}
        />
      </div>

      <ul className={styles.tabList}>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`${styles.tabItem} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
            <div className={styles.lineBelow}></div>
            {activeTab === tab && <div className={styles.activeLine}></div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabMenu;
