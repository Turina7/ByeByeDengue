'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./communityPosts.module.css";
import Link from "next/link";
import { getRecentImagePosts } from "@/actions/actions";

interface RecentPost {
  id: number;
  imageUrl: string;
  message: string;
  userName: string;
}

export function CommunityPostsSection() {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const posts = await getRecentImagePosts();
      setRecentPosts(posts);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

	return (
    <div className={styles.communityPosts}>
      <h2>Posts da comunidade</h2>
      <div className={styles.postsContainer}>
        {isLoading ? (
          <div className={styles.loading}>Carregando posts...</div>
        ) : recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <div className={styles.postImage}>
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