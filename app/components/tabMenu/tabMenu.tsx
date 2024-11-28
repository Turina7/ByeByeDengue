"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./tabMenu.module.css";
import Image from "next/image";
import logo from "@/app/images/Logo.png";
import Link from "next/link";
import AuthButton from "../authButton/authButton";
import userIcon from "@/app/images/user-icon.jpg";
import gearIcon from "@/app/images/gear-icon.png";

const TabMenu: React.FC = () => {
  const tabs = ["Home", "Wiki", "Mapas", "Denúncias", "Math", "Fórum"];
  const router = useRouter();
  const pathname = usePathname();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      // obriga recarregamento completo nas rotas protegidas
      if (normalizedTab === 'denuncias' || normalizedTab === 'forum') {
        window.location.href = `/${normalizedTab}`;
      } else
      router.push(`/${normalizedTab}`);
    }
  };

  const handleSettingsClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
    window.location.href = '/settings';
  }

  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropDownOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropDownOpen(!isDropDownOpen);
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
        <div
          className={styles.userIcon}
          onClick={(e) => {
            e.stopPropagation();
            setIsDropDownOpen(!isDropDownOpen);
          }}>
          <Image src={userIcon} alt="User Icon" width={60} height={60} />
        </div>

        {isDropDownOpen && (
            <div ref={dropdownRef} className={styles.dropdownMenu}>
              <div className={styles.menuItem} onClick={() => handleSettingsClick()}>
                <Image src={gearIcon} alt="Gear Icon" width={16} height={16} className={styles.icon} />
                <span>Configurações</span>
              </div>
            </div>
          )}

        <AuthButton className={styles.authButton} />
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