"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ArticleComponent from "@/app/components/wikipageSections/ArticleComponent";
import styles from "./wiki.module.css";
import Loading from "@/app/components/loading/Loading";
import Button from '@/app/components/button/button';
import { Modal, Box, Typography, Tooltip } from '@mui/material';
import CreateArticleForm from "@/app/components/wikipageSections/CreateArticleForm";

interface Article {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  text: string;
  userId: number;
}

const Page = () => {
  const router = useRouter();
  const title = "";
  const content = "";
  const { user, isAuthenticated } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handlePublishClick = () => {
    if (user?.role === "admin" || user?.role === "verified") {
      setShowCreateForm(true);
    } else {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleArticleCreated = (articleId: number) => {
    setShowCreateForm(false);
    router.push(`/wiki/${articleId}`);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Erro ao buscar artigos");
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        setError("Erro ao carregar artigos. Tente novamente mais tarde.");
        console.error("Erro ao buscar artigos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generic page layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>{title}</h1>
          <h2>Principais Artigos</h2>

          <div className={styles.publishButtonContainer}>
            {!isAuthenticated || !user ? (
              <Tooltip 
                title="Para publicar artigos você deve ser um usuário verificado"
                arrow
                placement="top"
              >
                <span>
                  <Button 
                    onClick={handlePublishClick}
                    disabled={!isAuthenticated || !user}
                  >
                    Publicar Artigo
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Button 
                onClick={handlePublishClick}
                disabled={!isAuthenticated || !user}
              >
                Publicar Artigo
              </Button>
            )}
          </div>

          {showCreateForm && user && (
            <CreateArticleForm 
              userId={user.id}
              onSuccess={handleArticleCreated}
            />
          )}

          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.articleList}>
              {articles.slice(0, 5).map((article) => (
                <ArticleComponent
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  author={`Autor ID ${article.userId}`}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  text={article.text}
                  summary={article.summary}
                />
              ))}
            </div>
          )}
          <p className={styles.content}>{content}</p>
        </section>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="role-verification-modal"
        >
          <Box className={styles.modalContainer}>
            <Typography variant="body1">
              Para publicar artigos você deve ser um usuário verificado. Se deseja ser um usuário verificado, entre em contato em ssouza@usp.br
            </Typography>
            <Button onClick={handleCloseModal}>
              Fechar
            </Button>
          </Box>
        </Modal>
      </main>
    </>
  );
};

export default Page;