"use client"; 

import { useState } from "react";
import TabMenu from "./components/tabMenu/tabMenu";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
