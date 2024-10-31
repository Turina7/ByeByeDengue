'use client';

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import TrackReport from '@/app/components/reports/TrackReport';
import { createReport } from '@/actions/actions';
import SuccessDialog from '@/app/components/reports/SuccessDialog';
import plantas from '@/app/images/plantas-image.jpg';
import entulho from '@/app/images/entulho-image.jpg';

const MOCK_USER_ID = 1;

const focusTypes = [
  { value: 'RECIPIENTES', label: 'Água parada em recipientes' },
  { value: 'PNEUS', label: 'Pneus abandonados' },
  { value: 'LIXO', label: 'Lixo acumulado' },
  { value: 'OUTROS', label: 'Outros potenciais focos' },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export default function DenguePage() {
  const [isNewReport, setIsNewReport] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [protocol, setProtocol] = React.useState('');
  const [fileError, setFileError] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setFileError('');
    
    try {
      const file = formData.get('file') as File;
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          setFileError('Arquivo muito grande. Tamanho máximo: 5MB');
          setLoading(false);
          return;
        }
        
        if (!ALLOWED_TYPES.includes(file.type)) {
          setFileError('Tipo de arquivo não permitido. Use apenas JPG ou PNG');
          setLoading(false);
          return;
        }
      }

      formData.append('userId', String(MOCK_USER_ID));
      
      const result = await createReport(formData);
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setProtocol(result.protocol);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Erro ao enviar denúncia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
  };

  return (
    <div className={styles.container}>
      <h1>Sistema de Denúncias - Focos de Dengue</h1>
      
      <div className={styles.toggleButtons}>
        <button 
          onClick={() => setIsNewReport(true)}
          className={`${styles.toggleButton} ${isNewReport ? styles.active : ''}`}
          disabled={loading}
        >
          Nova denúncia
        </button>
        <button 
          onClick={() => setIsNewReport(false)}
          className={`${styles.toggleButton} ${!isNewReport ? styles.active : ''}`}
          disabled={loading}
        >
          Acompanhar
        </button>
      </div>

      {isNewReport ? (
        <div className={styles.reportForm}>
          <h2>Nova Denúncia</h2>
          <div className={styles.reportFormContent}>
            <form ref={formRef} onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}>
              <div className={styles.formGroup}>
                <label htmlFor="focusType">Tipo de Foco</label>
                <select
                  id="focusType"
                  name="focusType"
                  required
                  className={styles.select}
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  onChange={() => setFileError('')}
                  disabled={loading}
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

              <button 
                type="submit" 
                className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Denúncia'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <TrackReport />
      )}
      
      <div className={styles.infoSection}>
        <h2>Cuidados importantes</h2>
        
        <h3>Entulho</h3>
        <p>Lixo e entulho podem ser foco de água parada e criadouro do mosquito Aedes aegypti</p>
        <Image 
          src={entulho}
          alt="Entulho" 
          width={300} 
          height={200}
          priority
        />
        
        <h3>Plantas</h3>
        <p>Cuide para que as plantas não acumulem água. Não use pratinhos nos vasos e verifique sempre a presença de água parada</p>
        <Image 
          src={plantas}
          alt="Plantas" 
          width={300} 
          height={200}
        />
      </div>
      
      <SuccessDialog 
        isOpen={showSuccessDialog}
        onClose={handleDialogClose}
        protocol={protocol}
      />
    </div>
  );
}