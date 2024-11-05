'use client';

import React from 'react';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import styles from './page.module.css';
import TrackReport from '@/app/components/reports/TrackReport';
import ReportForm from '@/app/components/reports/ReportForm';
import SuccessDialog from '@/app/components/reports/SuccessDialog';
import plantas from '@/app/images/plantas-image.jpg';
import entulho from '@/app/images/entulho-image.jpg';

export default function DenguePage() {
  const [isNewReport, setIsNewReport] = React.useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [protocol, setProtocol] = React.useState('');
  const { pending } = useFormStatus();

  const handleSuccess = (newProtocol: string) => {
    setProtocol(newProtocol);
    setShowSuccessDialog(true);
  };

  return (
    <div className={styles.container}>
      <h1>Sistema de Denúncias - Focos de Dengue</h1>
      
      <div className={styles.toggleButtons}>
        <button 
          onClick={() => setIsNewReport(true)}
          className={`${styles.toggleButton} ${isNewReport ? styles.active : ''}`}
          disabled={pending}
        >
          Nova denúncia
        </button>
        <button 
          onClick={() => setIsNewReport(false)}
          className={`${styles.toggleButton} ${!isNewReport ? styles.active : ''}`}
          disabled={pending}
        >
          Acompanhar
        </button>
      </div>

      {isNewReport ? (
        <div className={styles.reportForm}>
          <h2>Nova Denúncia</h2>
          <div className={styles.reportFormContent}>
            <ReportForm onSuccess={handleSuccess} />
          </div>
        </div>
      ) : (
        <TrackReport />
      )}

      <div className={styles.infoSection}>
        <h2>Cuidados importantes</h2>
        
        <h3>Entulho</h3>
        <p>Lixo e entulho podem ser foco de água parada e criadouro do mosquito Aedes aegypti</p>
        {/* TODO: dimensoes das imagens no css */}
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