'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getReportByProtocol } from '@/actions/actions';
import styles from '@/app/(pages)/denuncias/page.module.css';

export default function TrackReport() {
  const [protocol, setProtocol] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const reportData = await getReportByProtocol(protocol);
      setReport(reportData);
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
          {report.file && (
            <div>
              <strong>Foto anexada:</strong>
              <div className={styles.imageContainer}> 
								<Image 
									src={report.file}
									alt="Foto da denúncia"
									fill
									className={styles.reportImage}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
						</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}