import React from 'react';
import Head from 'next/head';
import styles from '@/app/page.module.css';
import Image from 'next/image';
import graph from '@/app/images/graficos-estatisticos.jpg'

interface PageProps {
  title: string;
  content: string;
}

const Page: React.FC<PageProps> = ({ title, content }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Página de dados estatísticos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>Dados Estatísticos</h1>
          <br/>
          <h2>Principais Estatísticas</h2>
          <br/>
          {/* Estatísticas mockadas */}
          <div className={styles.statisticsList}>
            <p><strong>Média:</strong> 123.45</p>
            <p><strong>Mediana:</strong> 100</p>
            <p><strong>Desvio Padrão:</strong> 15.67</p>
          </div>
          <br/>
          <br/>
          <h2>Estatísticas Adicionais</h2>
          <br/>
          <div className={styles.statisticsList}>
            <p><strong>Máximo:</strong> 200</p>
            <p><strong>Mínimo:</strong> 50</p>
            <p><strong>Variância:</strong> 245.89</p>
          </div>
          <br/>
          <br/>
          {/* Espaço para a imagem */}
          <h2>Visualização Gráfica</h2>
          <div className={styles.imageContainer}>
            <Image src={graph} alt="Gráfico de Dados Estatísticos" className={styles.image}/>
          </div>

          {/* Content adicional */}
          <p className={styles.content}>{content}</p>
        </section>
      </main>
    </>
  );
};

export default Page;
