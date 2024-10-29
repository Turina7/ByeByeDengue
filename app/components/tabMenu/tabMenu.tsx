"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./tabMenu.module.css";
import Image from "next/image";
import Button from "../button/button";
import logo from "@/app/images/Logo.png";
import Link from "next/link";

const TabMenu: React.FC = () => {
  const tabs = ["Home", "Wiki", "Mapas", "Denúncias", "Math", "Fórum"];
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = (path: string) => {
    if (path === '/') return 'Home';
    const tab = tabs.find(tab => 
      path.toLowerCase().includes(tab.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    );
    return tab || 'Home';
  };

  const activeTab = getActiveTab(pathname);

  const handleTabClick = (tab: string) => {
    const normalizedTab = tab
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (normalizedTab === "home") {
      router.push("/");
    } else {
      router.push(`/${normalizedTab}`);
    }
  };

  return (
    <div className={styles.tabMenu}>
      <div className={styles.logoAndButtonContainer}>
        <Link href="/" onClick={() => handleTabClick("Home")}>
          <div className={styles.logoContainer}>
            <Image
              src={logo}
              alt="Logo"
              className={styles.logo}
            />
          </div>
        </Link>
        <Button style={{ position: 'absolute', right: '10px' }} onClick={() => router.push("/login")}>
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