"use client";

import { useState, useEffect } from 'react';
import styles from "@/app/page.module.css";

interface MathData {
  title: string;
  content: string;
  statistics: {
    label: string;
    value: number;
  }[];
}

const Page = () => {
  const [mathData, setMathData] = useState<MathData>({
    title: 'Matemática',
    content: 'Página de análise matemática da dengue.',
    statistics: [
      { label: 'Casos este mês', value: 0 },
      { label: 'Taxa de crescimento', value: 0 },
      { label: 'Previsão próximo mês', value: 0 }
    ]
  });

  useEffect(() => {
    const fetchMathData = async () => {
      try {
        const response = await fetch('/api/math-statistics');
        const data = await response.json();
        setMathData(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchMathData();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>{mathData.title}</h1>
        <p className={styles.content}>{mathData.content}</p>
        
        <div className={styles.statistics}>
          {mathData.statistics.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;