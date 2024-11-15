import React from 'react';
import styles from './loading.module.css';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loading = ({ 
  message = 'Carregando...', 
  size = 'medium',
  color = '#D70000' 
}: LoadingProps) => {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div 
        className={styles.spinner}
        style={{
          borderTopColor: color
        }}
      />
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;