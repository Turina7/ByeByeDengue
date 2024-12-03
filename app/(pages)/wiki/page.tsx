"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ArticleComponent from "@/app/components/wikipageSections/ArticleComponent";
import styles from "./wiki.module.css";
import Loading from "@/app/components/loading/Loading";
import Button from "@/app/components/button/button";
import { Modal, Box, Typography, Tooltip } from "@mui/material";
import CreateArticleForm from "@/app/components/wikipageSections/CreateArticleForm";

interface Article {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
  text: string;
  userId: number;
  keywords: string[]; // Garantindo que keywords seja tratada como um array
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
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

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
        const data: Article[] = await response.json(); // Especifica o tipo de data como Article[]
  
        // Lê o parâmetro `keyword` da URL
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get("keyword");
  
        if (keyword) {
          // Filtra artigos que contenham a keyword
          const filteredData = data.filter((article: Article) =>
            article.keywords.includes(keyword)
          );
          setSelectedKeyword(keyword); // Atualiza o estado da keyword
          setArticles(filteredData); // Define os artigos filtrados
        } else {
          setArticles(data); // Define todos os artigos
        }
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
        setError("Erro ao carregar artigos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, []);
  
  
  const handleClearFilter = () => {
    // Redefine o filtro e remove o parâmetro `keyword` da URL
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Erro ao buscar artigos");
        }
        const data = await response.json();
        setArticles(data); // Define todos os artigos
        setSelectedKeyword(null); // Limpa o estado da keyword
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete("keyword"); // Remove o parâmetro da URL
        window.history.replaceState({}, "", window.location.pathname); // Atualiza a URL sem recarregar a página
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
      }
    };
  
    fetchArticles();
  };
  
  if (loading) {
    return <Loading message="Carregando..." />;
  }
  
  const filteredArticles = selectedKeyword
    ? articles.filter((article) => article.keywords.includes(selectedKeyword))
    : articles;

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
            <CreateArticleForm userId={user.id} onSuccess={handleArticleCreated} />
          )}

          {selectedKeyword && (
            <div>
              <p>Filtrando por: <strong>{selectedKeyword}</strong></p>
              <Button onClick={handleClearFilter}>Mostrar todos os artigos</Button>
            </div>
          )}


          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.articleList}>
              {filteredArticles.map((article) => (
                <ArticleComponent
                  key={article.id}
                  id={article.id}
                  title={article.title}
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
            <Button onClick={handleCloseModal}>Fechar</Button>
          </Box>
        </Modal>
      </main>
    </>
  );
};

export default Page;
