import React, { useState } from "react";
import Button from "../button/button";
import styles from './forumCard.module.css';

export interface Comment {
  id: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: Date;
}

export interface CardContent {
  id: number;
  header: string;
  post: string;
  message: string;
  comments: Comment[];
  userId: number;
}

interface ForumCardProps {
  cardContent: CardContent;
  active: boolean;
  handleComment: (comment: string) => void;
  handleDeletePost: (postId: number) => Promise<void>;
  handleDeleteComment: (postId: number, commentId: number) => Promise<void>;
  currentUserId: number;
}

const ForumCard: React.FC<ForumCardProps> = ({
  cardContent,
  active,
  handleComment,
  handleDeletePost,
  handleDeleteComment,
  currentUserId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const onSubmitComment = () => {
    if (newComment.trim()) {
      handleComment(newComment);
      setNewComment("");
      setIsCommenting(false);
    }
  };

  return (
    <div className={`${styles.forumCard} ${active ? styles.active : ""}`}>
      <div className={styles.forumCardHeader}>
        {cardContent.header}
        {cardContent.userId === currentUserId && (
          <button
            onClick={() => handleDeletePost(cardContent.id)}
            className={styles.deleteButton}
            title="Deletar post"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.forumCardPost}>
        {cardContent.post}
      </div>

      <div className={styles.forumCardMessage}>
        {cardContent.message}
      </div>

      <div className={styles.forumCardComments}>
        <strong>
          <span style={{ color: '#D70000' }}>
            Comentários {cardContent.comments.length}
          </span>
        </strong>
        <div className={styles.commentsList}>
          {cardContent.comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <strong>{comment.userName}:</strong>
                {(comment.userId === currentUserId) && (
                  <button
                    onClick={() => handleDeleteComment(cardContent.id, comment.id)}
                    className={styles.deleteCommentButton}
                    title="Deletar comentário"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className={styles.commentContent}>
                {comment.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCommenting ? (
        <div className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Digite seu comentário..."
            className={styles.commentInput}
          />
          <div className={styles.commentButtons}>
            <Button onClick={onSubmitComment}>
              Enviar
            </Button>
            <Button onClick={() => setIsCommenting(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsCommenting(true)}>
          Comentar
        </Button>
      )}
    </div>
  );
};

export default ForumCard;