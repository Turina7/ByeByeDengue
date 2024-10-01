import React from "react";
import styles from "./tabMenu.module.css";
import Image from "next/image"; // Importa o componente Image do Next.js
import logo from "@/app/images/Logo.png"; // Importa a logo

interface TabMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["Home", "Wiki", "Mapas", "Denúncias", "Math", "FAQ"];

  return (
    <div className={styles.tabMenu}>
      {/* Logo centralizado */}
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" className={styles.logo} layout="intrinsic" width={180} height={90}/> {/* Usando Image */}
      </div>

      <ul className={styles.tabList}>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`${styles.tabItem} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
            {/* A linha preta abaixo de todas as abas */}
            <div className={styles.lineBelow}></div>
            {/* A linha vermelha apenas na aba ativa */}
            {activeTab === tab && <div className={styles.activeLine}></div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabMenu;
