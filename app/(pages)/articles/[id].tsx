import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  content: string;
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`/api/articles/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao carregar o artigo");
          }
          const data = await response.json();
          setArticle(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchArticle();
    }
  }, [id]);

  if (!article) return <Loading message="Carregando..." />;

  return (
    <main>
      <h1>{article.title}</h1>
      <h2>{article.subtitle}</h2>
      <p>{article.content}</p>
    </main>
  );
};

export default ArticlePage;
