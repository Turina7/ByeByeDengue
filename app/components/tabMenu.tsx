"use client"; // Ensure the component is treated as a client component

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import styles from "./tabMenu.module.css";
import Image from "next/image"; // Import Image component from Next.js
import Button from "./button";
import logo from "@/app/images/Logo.png"; // Import the logo

interface TabMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["Home", "Wiki", "Mapas", "Denuncias", "Math", "Forum"];
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
      <div className={styles.logoAndButtonContainer}>
      <div className={styles.logoContainer}>
        <Image
          src={logo}
          alt="Logo"
          className={styles.logo}
          layout="intrinsic"
          width={150}
          height={70}
        />
      </div>
      <Button style={{ position: 'absolute', right: '10px' }} onClick={() => console.log('Clicado!')}>
        Cadastre-se
      </Button>
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
