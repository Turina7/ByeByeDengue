'use client';

import { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import styles from "./protectSection.module.css";
import Link from "next/link";
import { getFeaturedArticles, type FeaturedArticle } from "@/actions/actions";

type ArticleWithImage = Omit<FeaturedArticle, 'imageUrl'> & { imageUrl: string };

export function ProtectSection() {
  const [articles, setArticles] = useState<ArticleWithImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const fetchedArticles = await getFeaturedArticles();
        const validArticles = fetchedArticles.filter((article): article is ArticleWithImage => 
          article.imageUrl !== null
        );
        setArticles(validArticles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar artigos');
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  if (error) {
    return (
      <div className={styles.protect}>
        <h2>Artigos em Destaque</h2>
        <div className={styles.error}>Erro ao carregar artigos: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.protect}>
      <h2>Artigos em Destaque</h2>
      <p>
        Confira nossos principais artigos sobre a dengue e mantenha-se informado.
      </p>

      <div className={styles.sections}>
        {isLoading ? (
          <Loading message="Carregando artigos..." />
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <Link 
              href={`/wiki/${article.id}`}
              key={article.id} 
              className={styles.sectionItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.articleImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  priority
                />
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </Link>
          ))
        ) : (
          <div className={styles.noArticlesMessage}>
            Ainda não há artigos com imagens
          </div>
        )}
      </div>
    </div>
  );
}