"use client";

import TabMenu from "@/app/components/tabMenu"; // Importa o componente TabMenu
import { useState } from "react";
import styles from "./page.module.css"; // Importa o CSS

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home"); // Aba ativa inicial

  // Função para alterar a aba ativa
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.ctas}>
      <main className={styles.main}>

        {/* Componente TabMenu, recebe a aba ativa e a função de troca de aba */}
        <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Conteúdo dinâmico baseado na aba ativa */}
        <div style={{ padding: "20px" }}>
          {activeTab === "Home" && <p>Conteúdo da Home</p>}
          {activeTab === "Wiki" && <p>Conteúdo da Wiki</p>}
          {activeTab === "Mapas" && <p>Conteúdo dos Mapas</p>}
          {activeTab === "Denúncias" && <p>Conteúdo das Denúncias</p>}
          {activeTab === "Math" && <p>Conteúdo de Math</p>}
          {activeTab === "FAQ" && <p>Conteúdo do FAQ</p>}
        </div>
      </main>

      {/* Rodapé */}
      <footer className={styles.footer}>
        <h1>Rodapé</h1>
        {/* Adicione conteúdo de rodapé conforme necessário */}
      </footer>
    </div>
  );
}
