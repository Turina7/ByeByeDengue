import React from 'react';
import Head from 'next/head';
import styles from './mapas.module.css';
import Image from 'next/image';
import map from '@/app/images/mapas.png';

interface PageProps {
  title: string;
  locationInfo: string;
}

const MapPage: React.FC<PageProps> = ({ title, locationInfo }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Página com mapa interativo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>{title}</h1>
          <br/>
          <div className={styles.mapContainer}>
            {/* Espaço para o mapa mockado */}
            <div className={styles.map}>
              <Image src={map} alt="Mapa Interativo" className={styles.mapImage} />
            </div>

            {/* Informações do local ao lado do mapa */}
            <div className={styles.locationInfo}>
              <h2>Informações do Local</h2>
              <p>{locationInfo}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MapPage;
