'use client';

import { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import styles from "./communityPosts.module.css";
import Link from "next/link";
import { getRecentImagePosts } from "@/actions/actions";

interface RecentPost {
  id: number;
  imageUrl: string | null;
  message: string;
  userName: string;
}

type PostWithImage = Omit<RecentPost, 'imageUrl'> & { imageUrl: string };

export function CommunityPostsSection() {
  const [recentPosts, setRecentPosts] = useState<PostWithImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getRecentImagePosts();
        const validPosts = posts.filter((post): post is PostWithImage => 
          post.imageUrl !== null
        );
        setRecentPosts(validPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (error) {
    return (
      <div className={styles.communityPosts}>
        <h2>Posts da comunidade</h2>
        <div className={styles.error}>Erro ao carregar posts: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.communityPosts}>
      <h2>Posts da comunidade</h2>
      <div className={styles.postsContainer}>
        {isLoading ? (
          <Loading message="Carregando posts..." />
        ) : recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postImageContainer}>
                <Image
                  src={post.imageUrl}
                  alt={`Post de ${post.userName}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 480px) 160px, 200px"
                  className={styles.postImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className={styles.postInfo}>
                <p className={styles.userName}>{post.userName}</p>
                <p className={styles.postMessage}>{post.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noPostsMessage}>
            Ainda não há posts com imagens
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/forum">
          <button className={styles.forumButton}>Acesse o Fórum</button>
        </Link>
      </div>
    </div>
  );
}