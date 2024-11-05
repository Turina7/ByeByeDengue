import React, { useState } from 'react';
import Button from "../button/button";
import styles from './createPost.module.css';

interface CreatePostFormProps {
  onSubmit: (message: string) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsCreating(true);
    try {
      await onSubmit(message);
      setMessage('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={styles.createPostContainer}>
      <h2 className={styles.createPostTitle}>Criar Nova Postagem</h2>
      <form onSubmit={handleSubmit} className={styles.createPostForm}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="O que você gostaria de compartilhar?"
          className={styles.createPostInput}
          required
        />
        <Button
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? 'Publicando...' : 'Publicar'}
        </Button>
      </form>
    </div>
  );
};

export default CreatePostForm;