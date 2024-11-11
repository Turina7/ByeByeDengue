import React from 'react';
import styles from './SuccessDialog.module.css';

interface SuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
  }
  
  const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, message }) => {
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
            {message}
          </h2>

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