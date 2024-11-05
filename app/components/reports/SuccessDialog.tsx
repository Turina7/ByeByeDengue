import React from 'react';
import styles from './SuccessDialog.module.css';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  protocol: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, protocol }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.iconContainer}>
          <svg 
            className={styles.icon}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        
        <h2 className={styles.title}>
          Denúncia Enviada com Sucesso!
        </h2>
        
        <p className={styles.message}>
          Sua denúncia foi registrada e será analisada pela nossa equipe.
        </p>
        
        <p className={styles.protocol}>
          Número do protocolo:
          <span className={styles.protocolNumber}>{protocol}</span>
        </p>
        
        <p className={styles.helpText}>
          Guarde este número para acompanhar o status da sua denúncia.
        </p>
        
        <button 
          className={styles.button}
          onClick={onClose}
        >
          Entendi
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;