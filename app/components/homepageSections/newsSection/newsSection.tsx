import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./newsSection.module.css";
import mosquito from "@/app/images/mosquito.jpg";

interface NewsItem {
  socialimage: string;
  title: string;
  url: string;
}

export function NewsSection() {
  const [newsData, setNewsData] = useState<NewsItem[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/dengue-news');
        if (!response.ok) {
          throw new Error('Falha ao carregar as notícias');
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao carregar notícias');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando notícias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>❌ {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>Nenhuma notícia encontrada</p>
      </div>
    );
  }

  const totalNews = newsData.length;
  const totalPages = Math.ceil(totalNews / ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + ITEMS_PER_PAGE;
      return nextIndex >= totalNews ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevPage = prevIndex - ITEMS_PER_PAGE;
      return prevPage < 0 ? totalNews - ITEMS_PER_PAGE : prevPage;
    });
  };

  const currentPage = Math.floor(currentIndex / ITEMS_PER_PAGE) + 1;
  const currentNewsItems = newsData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

  return (
    <section className={styles.news}>
      <h2>Notícias</h2>

      <div className={styles.newsItemsContainer}>
        {currentNewsItems.map((newsItem, index) => (
          <article 
            key={`${currentIndex}-${index}`} 
            className={styles.newsItem}
          >
            <div className={styles.imageContainer}>
              <Image
                src={newsItem.socialimage || mosquito}
                alt={newsItem.title}
                width={150}
                height={150}
                className={styles.newsImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = mosquito.src;
                }}
              />
            </div>
            <div className={styles.newsContent}>
              <h3>{newsItem.title}</h3>
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsLink}
              >
                Ler mais →
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.navigation}>
        <button 
          onClick={handlePrev} 
          className={styles.arrowButton}
          aria-label="Notícias anteriores"
        >
          ←
        </button>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageIndicator} ${
                currentPage === i + 1 ? styles.activePage : ''
              }`}
              onClick={() => setCurrentIndex(i * ITEMS_PER_PAGE)}
              aria-label={`Página ${i + 1}`}
            >
              •
            </button>
          ))}
        </div>
        <button 
          onClick={handleNext} 
          className={styles.arrowButton}
          aria-label="Próximas notícias"
        >
          →
        </button>
      </div>
    </section>
  );
}