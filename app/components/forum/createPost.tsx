import React, { useState, useRef } from 'react';
import Button from "../button/button";
import styles from './createPost.module.css';
import Image from 'next/image';

interface CreatePostFormProps {
  onSubmit: (message: string, image: File | null) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsCreating(true);
    try {
      await onSubmit(message, image);
      setMessage('');
      setImage(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB');
        return;
      }
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        
        <div className={styles.imageUploadContainer}>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.imageInput}
            id="imageInput"
          />
          <label htmlFor="imageInput" className={styles.imageInputLabel}>
            Escolher Imagem
          </label>
          {previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <div className={styles.imagePreview}>
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className={styles.removeImageButton}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

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