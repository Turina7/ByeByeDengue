'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getReportByProtocol } from '@/actions/actions';
import styles from '@/app/(pages)/denuncias/page.module.css';
import { Report } from '@/types/report';

export default function TrackReport() {
  const [protocol, setProtocol] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const reportData = await getReportByProtocol(protocol);
      setReport(reportData as Report);
    } catch (error) {
      console.error('Error fetching report:', error);
      setError('Denúncia não encontrada ou erro ao buscar');
      setReport(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.trackReport}>
      <form onSubmit={handleSearch}>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            placeholder="Número do protocolo"
            className={styles.input}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      
      {report && (
        <div className={styles.reportDetails}>
          <h3>Detalhes da Denúncia</h3>
          <p><strong>Protocolo:</strong> {report.protocol}</p>
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Tipo de Foco:</strong> {report.focusType}</p>
          <p><strong>Local:</strong> {report.location}</p>
          <p><strong>Data da Observação:</strong> {new Date(report.observationDate).toLocaleString()}</p>
          <p><strong>Descrição:</strong> {report.description}</p>
          {report.fileUrl && (
            <div className={styles.imageContainer}>
              <div className={styles.imagePreview}>
                {/* TODO: dimensoes das imagens no css */}
                <Image 
                  src={report.fileUrl}
                  alt="Foto do local"
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {report.fileDescription && (
                <p className={styles.fileDescription}>
                  <strong>Descrição da Foto:</strong> {report.fileDescription}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}