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

export default function DenguePage() {
  const [isNewReport, setIsNewReport] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [protocol, setProtocol] = React.useState('');

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      formData.append('userId', String(MOCK_USER_ID));
      
      const result = await createReport(formData);
      setProtocol(result.protocol);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Erro ao enviar denúncia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Sistema de Denúncias - Focos de Dengue</h1>
      
      <div className={styles.toggleButtons}>
        <button 
          onClick={() => setIsNewReport(true)}
          className={`${styles.toggleButton} ${isNewReport ? styles.active : ''}`}
        >
          Nova denúncia
        </button>
        <button 
          onClick={() => setIsNewReport(false)}
          className={`${styles.toggleButton} ${!isNewReport ? styles.active : ''}`}
        >
          Acompanhar
        </button>
      </div>

      {isNewReport ? (
        <div className={styles.reportForm}>
          <h2>Nova Denúncia</h2>
          <div className={styles.reportFormContent}>
            <form action={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="focusType">Tipo de Foco</label>
                <select
                  id="focusType"
                  name="focusType"
                  required
                  className={styles.select}
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
                />
                <small className={styles.helpText}>
                  Anexe uma foto do local para ajudar na identificação
                </small>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
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
        onClose={() => setShowSuccessDialog(false)}
        protocol={protocol}
      />
    </div>
  );
}