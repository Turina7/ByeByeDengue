'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import styles from '@/app/(pages)/denuncias/page.module.css';
import { createReport } from '@/actions/actions';

const MOCK_USER_ID = 1;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const focusTypes = [
  'Água parada em recipientes',
  'Pneus abandonados',
  'Lixo acumulado',
  'Outros potenciais focos'
].map(label => ({ value: label, label }));

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      className={`${styles.submitButton} ${pending ? styles.loading : ''}`}
      disabled={pending}
    >
      {pending ? 'Enviando...' : 'Enviar Denúncia'}
    </button>
  );
}

interface ReportFormProps {
  onSuccess: (protocol: string) => void;
}

export default function ReportForm({ onSuccess }: ReportFormProps) {
  const [fileError, setFileError] = React.useState('');
  const [hasFile, setHasFile] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    setHasFile(!!file);
  };

  async function handleSubmit(formData: FormData) {
    setFileError('');
    
    try {
      const file = formData.get('file') as File;
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          setFileError('Arquivo muito grande. Tamanho máximo: 5MB');
          return;
        }
        
        if (!ALLOWED_TYPES.includes(file.type)) {
          setFileError('Tipo de arquivo não permitido. Use apenas JPG ou PNG');
          return;
        }

        const fileDescription = formData.get('fileDescription');
        if (!fileDescription) {
          setFileError('Por favor, forneça uma descrição para a foto');
          return;
        }
      }

      formData.append('userId', String(MOCK_USER_ID));
      
      const result = await createReport(formData);
      
      if (formRef.current) {
        formRef.current.reset();
        setHasFile(false);
      }
      
      onSuccess(result.protocol);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Erro ao enviar denúncia. Tente novamente.');
    }
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="focusType">Tipo de Foco</label>
        <select
          id="focusType"
          name="focusType"
          required
          className={styles.select}
          disabled={pending}
        >
          <option value="">Selecione o tipo de foco</option>
          {focusTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição da Situação</label>
        <textarea
          id="description"
          name="description"
          required
          className={styles.input}
          rows={4}
          disabled={pending}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location">Localização</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className={styles.input}
          disabled={pending}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="observationDate">Data da Observação</label>
        <input
          type="datetime-local"
          id="observationDate"
          name="observationDate"
          required
          className={styles.input}
          disabled={pending}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="file">Anexar Foto (Opcional)</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          className={styles.input}
          onChange={handleFileChange}
          disabled={pending}
        />
        <small className={styles.helpText}>
          Anexe uma foto do local para ajudar na identificação (máx. 5MB, formato JPG ou PNG)
        </small>
        {fileError && (
          <small className={styles.errorText}>
            {fileError}
          </small>
        )}
      </div>

      {hasFile && (
        <div className={styles.formGroup}>
          <label htmlFor="fileDescription">
            Descrição da Foto <span className={styles.required}>*</span>
          </label>
          <textarea
            id="fileDescription"
            name="fileDescription"
            required
            className={styles.input}
            rows={2}
            disabled={pending}
          />
          <small className={styles.helpText}>
            Forneça uma breve descrição do que pode ser visto na foto
          </small>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}