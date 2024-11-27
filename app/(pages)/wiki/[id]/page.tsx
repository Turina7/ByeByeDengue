"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/app/components/loading/Loading';
import styles from './page.module.css';
import Button from '@/app/components/button/button';
import { useRouter } from 'next/navigation';

type Article = {
 id: number;
 title: string;
 text: string;
 summary: string;
 createdAt: string;
 userId: number;
};

export default function ArticlePage() {
 const router = useRouter();
 const params = useParams();
 const [article, setArticle] = useState<Article | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchArticle = async () => {
     try {
       const response = await fetch(`/api/articles/${params.id}`);
       if (!response.ok) throw new Error('Artigo não encontrado');
       const data = await response.json();
       setArticle(data);
     } catch (error) {
       setError('Erro ao carregar artigo');
       console.error(error);
     } finally {
       setLoading(false);
     }
   };

   fetchArticle();
 }, [params.id]);

 if (loading) return <Loading message="Carregando..." />;
 if (error) return <div className={styles.error}>{error}</div>;
 if (!article) return <div>Artigo não encontrado</div>;

 return (
			<main className={styles.container}>
			<Button onClick={() => router.push('/wiki')}>
				Voltar
			</Button>
			<article className={styles.article}>
       <h1>{article.title}</h1>
       <div className={styles.metadata}>
         <span>Por: Autor ID {article.userId}</span>
         <span>{new Date(article.createdAt).toLocaleDateString()}</span>
       </div>
       <p className={styles.summary}>{article.summary}</p>
       <div className={styles.content}>{article.text}</div>
     </article>
   </main>
 );
}