'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import plantas from '@/app/images/plantas-image.jpg';
import entulho from '@/app/images/entulho-image.jpg';

interface FormData {
  nome: string;
  sobrenome: string;
  contato: string;
  local: string;
  motivo: string;
}

const initialFormData: FormData = {
  nome: '',
  sobrenome: '',
  contato: '',
  local: '',
  motivo: ''
};

export default function DenguePage() {
  const [isNewReport, setIsNewReport] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Denúncias</h1>
      <p>Aqui você pode criar e acompanhar denúncias</p>
      
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
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              type="text"
              id="sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contato">Contato</label>
            <input
              type="email"
              id="contato"
              name="contato"
              value={formData.contato}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="local">Local</label>
            <input
              type="text"
              id="local"
              name="local"
              value={formData.local}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="motivo">Motivo da denúncia</label>
            <select
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleInputChange}
              required
              className={styles.select}
            >
              <option value="">Selecione</option>
              <option value="lixo_entulho">Lixo e entulho</option>
              <option value="piscina_descoberta">Piscina descoberta</option>
              <option value="area_abandonada">Área abandonada</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar denúncia
          </button>
        </form>
      ) : (
        <div className={styles.trackReport}>
          <p>Para acompanhar sua denúncia, insira o número de protocolo:</p>
          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="Número do protocolo"
              className={styles.input}
            />
            <button className={styles.submitButton}>
              Buscar
            </button>
          </div>
        </div>
      )}

      <div className={styles.infoSection}>
        <h2>Entulho</h2>
        <p>Lixo e entulho pode ser foco de água parada e criadouro do mosquito aedes aegypti</p>
        <Image 
          src={entulho}
          alt="Entulho" 
          width={300} 
          height={200}
          priority
        />
        
        <h2>Plantas</h2>
        <p>Cuide para que as plantas não acumulem água. Não use pratinhos nos vasos e verifique sempre a presença de água parada</p>
        <Image 
          src={plantas}
          alt="Plantas" 
          width={300} 
          height={200}
        />
      </div>
    </div>
  );
}
