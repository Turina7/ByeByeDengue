"use client";

import styles from "./feedback.module.css";
import Button from "@/app/components/button/button";
import Image from "next/image";
import pix from "@/app/images/pix-qrcode.png";
import { useRef } from "react";

const Page = () => {
  const feedbackRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitFeedback = () => {
    const currentDate = new Date().toISOString();
    console.log("Data:", currentDate);
    console.log("Feedback:", feedbackRef.current?.value);
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
              />
            </div>

            <Button onClick={handleSubmitFeedback}>
              Enviar
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