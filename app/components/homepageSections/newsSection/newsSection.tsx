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

  useEffect(() => {
    fetch('/api/dengue-news')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Dengue News Data:', data);
        setNewsData(data);
      })
      .catch(error => {
        console.error('Error fetching dengue news:', error);
      });
  }, []);

  if (newsData === null) {
    return (
      <div>
        <h2>Notícias</h2>
        <h3>Loading...</h3>
      </div>
    );
  }

  const totalNews = newsData.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % totalNews);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + totalNews) % totalNews);
  };

  const currentNewsItems = newsData.slice(currentIndex, currentIndex + 3);

  return (
    <div className={styles.news}>
      <h2>Notícias</h2>

      <div className={styles.newsItemsContainer}>
        {currentNewsItems.map((newsItem, index) => (
          <div key={index} className={styles.newsItem}>
            <Image
              src={newsItem.socialimage || mosquito}
              alt={newsItem.title}
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
            <div>
              <h3>{newsItem.title}</h3>
              <p>
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {newsItem.url}
                </a>
              </p>
            </div>
          </div>
        ))}
        <div className={styles.navigation}>
          <button onClick={handlePrev} className={styles.arrowButton}>←</button>
          <button onClick={handleNext} className={styles.arrowButton}>→</button>
        </div>
      </div>
    </div>
  );
}
