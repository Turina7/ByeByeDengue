"use client";

import { useEffect, useState } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import style from "@/app/components/forum/forumCard.module.css";
import styles from "@/app/page.module.css";
import ForumCard, { CardContent } from "@/app/components/forum/forumCard";
import CreatePostForm from "@/app/components/forum/createPost";
import { 
  getForumPosts, 
  createForumPost, 
  createComment,
  deleteForumPost,
  deleteForumComment 
} from "@/actions/actions";

const Page = () => {
  const [forumPosts, setForumPosts] = useState<CardContent[]>([]);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  const loadPosts = async () => {
    try {
      const posts = await getForumPosts();
      setForumPosts(posts);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (isAuthenticated === null || !user) {
    return <div>Carregando...</div>;
  }

  const handleCreatePost = async (message: string, image: File | null) => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("userId", user.id.toString());
      formData.append("section", "general");
      if (image) {
        formData.append("image", image);
      }
      
      await createForumPost(formData);
      await loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleComment = async (postId: number, comment: string) => {
    try {
      const formData = new FormData();
      formData.append("content", comment);
      formData.append("postId", postId.toString());
      formData.append("userId", user.id.toString());

      await createComment(formData);
      await loadPosts();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta postagem?")) {
      try {
        await deleteForumPost(postId, user.id);
        await loadPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    if (window.confirm("Tem certeza que deseja deletar este comentário?")) {
      try {
        await deleteForumComment(commentId, user.id);
        await loadPosts();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h1 className={styles.title}>Fórum de Discussão</h1>
        <p>
          Este é o espaço da comunidade!
          Aqui você pode ver as postagens em alta e publicar sua mensagem ou comentário. Experimente!
        </p>

        <CreatePostForm onSubmit={handleCreatePost} />

        <div className={style.cardContainer}>
          {forumPosts.map((post) => (
            <ForumCard
              key={post.id}
              cardContent={post}
              active={true}
              handleComment={(comment) => handleComment(post.id, comment)}
              handleDeletePost={handleDeletePost}
              handleDeleteComment={handleDeleteComment}
              currentUserId={user.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;