"use client";

import { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";

const Page = () => {
  const [mapData, setMapData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    const fetchMapData = async () => {
      // Fetch your map data here
      const response = await fetch('/api/maps');
      const data = await response.json();
      setMapData(data);
    };

    fetchMapData();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{mapData.title}</h1>
        <p className={styles.content}>{mapData.content}</p>
      </section>
    </main>
  );
};

export default Page;