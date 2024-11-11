"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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

  async function handleCreatePost(message: string, image: File | null) {
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    const userId = user.id; // Guardar o ID em uma constante após a verificação

    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("userId", userId.toString());
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
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    const userId = user.id;

    try {
      const formData = new FormData();
      formData.append("content", comment);
      formData.append("postId", postId.toString());
      formData.append("userId", userId.toString());

      await createComment(formData);
      await loadPosts();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    const userId = user.id;

    if (window.confirm("Tem certeza que deseja deletar esta postagem?")) {
      try {
        await deleteForumPost(postId, userId);
        await loadPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    const userId = user.id;

    if (window.confirm("Tem certeza que deseja deletar este comentário?")) {
      try {
        await deleteForumComment(commentId, userId);
        await loadPosts();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  if (!isAuthenticated || !user) {
    return <div>Carregando...</div>;
  }

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