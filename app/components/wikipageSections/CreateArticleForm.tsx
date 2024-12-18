import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createArticle } from '@/actions/actions';
import styles from './createArticle.module.css';
import Image from 'next/image';

interface CreateArticleFormProps {
  userId: number;
  onSuccess: (articleId: number) => void;
}

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({ userId, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFile(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    formData.append('userId', userId.toString());
    
    if (file) {
      formData.set('file', file);
    }

    try {
      const result = await createArticle(formData);
      if (result.success) {
        onSuccess(result.id);
        (e.target as HTMLFormElement).reset();
        setImagePreview('');
        setFile(null);
      }
    } catch (err) {
      console.error('Error creating article:', err);
      setError('Ocorreu um erro ao criar o artigo. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.createPostContainer}>
      <h2 className={styles.createPostTitle}>Criar Novo Artigo</h2>
      
      <form onSubmit={handleSubmit} className={styles.createPostForm}>
        <input
          type="text"
          name="title"
          placeholder="Título do artigo"
          required
          className={styles.createPostInput}
          style={{ minHeight: '40px' }}
        />
        
        <textarea
          name="summary"
          placeholder="Resumo do artigo"
          required
          className={styles.createPostInput}
          style={{ minHeight: '80px' }}
        />
        
        <textarea
          name="description"
          placeholder="Descrição do artigo"
          required
          className={styles.createPostInput}
        />
        
        <textarea
          name="text"
          placeholder="Texto completo do artigo"
          required
          className={styles.createPostInput}
          style={{ minHeight: '200px' }}
        />
        
        <input
          type="text"
          name="section"
          placeholder="Seção do artigo"
          required
          className={styles.createPostInput}
          style={{ minHeight: '40px' }}
        />
        
        <input
          type="text"
          name="keywords"
          placeholder="Palavras-chave (separadas por vírgula)"
          required
          className={styles.createPostInput}
          style={{ minHeight: '40px' }}
        />

        <div className={styles.imageUploadContainer}>
          <label className={styles.imageInputLabel}>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.imageInput}
            />
            Adicionar Imagem
          </label>

          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <div className={styles.imagePreview}>
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  width={200} 
                  height={200} 
                  style={{ objectFit: 'contain', borderRadius: '4px' }} 
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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Enviando...' : 'Publicar Artigo'}
        </button>
      </form>
    </div>
  );
};

export default CreateArticleForm;