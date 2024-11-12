"use client";

import styles from "./feedback.module.css";
import Button from "@/app/components/button/button";
import Image from "next/image";
import pix from "@/app/images/pix-qrcode.png";
import { useRef, useState } from "react";
import { createFeedback } from "@/actions/actions";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Page = () => {
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{
    type: 'success' | 'error',
    message: string
  } | null>(null);

  const handleSubmitFeedback = async () => {
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    const feedbackText = feedbackRef.current?.value;
    if (!feedbackText?.trim()) {
      setResponseMessage({
        type: 'error',
        message: 'Por favor, escreva seu feedback antes de enviar.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setResponseMessage(null);
      
      const formData = new FormData();
      formData.append("feedback", feedbackText);
      formData.append("userId", user.id.toString());
      
      await createFeedback(formData);
      feedbackRef.current!.value = "";
      setResponseMessage({
        type: 'success',
        message: 'Feedback enviado com sucesso! Obrigado pela sua contribuição.'
      });
    } catch (error) {
      console.error("Error creating feedback:", error);
      setResponseMessage({
        type: 'error',
        message: 'Erro ao enviar feedback. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.feedbackForm}>
          <h2>Envie seu Feedback</h2>
          <p className={styles.description}>
            Nos ajude a melhorar! Compartilhe sua experiência e sugestões sobre nosso site.
            Seu feedback é muito importante para continuarmos evoluindo nossa plataforma. 
          </p>
          <p className={styles.highlight}>
            Seu feedback poderá ser mostrado na página inicial.
          </p>

          <div className={styles.formContent}>
            <label>Seu Feedback</label>
            <div className={styles.formGroup}>
              <textarea
                placeholder="Descreva sua experiência, sugestões ou problemas encontrados..."
                ref={feedbackRef}
                className={styles.textarea}
                disabled={isSubmitting}
              />
            </div>

            {responseMessage && (
              <div className={`${styles.responseMessage} ${styles[responseMessage.type]}`}>
                {responseMessage.message}
              </div>
            )}

            <Button 
              onClick={handleSubmitFeedback} 
              disabled={isSubmitting}
              className={`${styles.button} ${isSubmitting ? styles.buttonDisabled : ''}`}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>

        <div className={styles.donationSection}>
          <h2>Apoie o Projeto</h2>
          <p className={styles.description}>
            Se você gostou do nosso trabalho, considere fazer uma doação para ajudar a manter o projeto.
          </p>
          
          <div className={styles.pixContainer}>
            <Image
              src={pix}
              alt="pix-qrcode"
              width={200}
              height={200}
              className={styles.qrCode}
            />
            <p>PIX</p>
            <small>Escaneie o QR Code</small>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;