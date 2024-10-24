"use client";

import styles from "./about.module.css";
import Button from "@/app/components/button/button";
import Image from "next/image";
import logo from "@/app/images/about-logo.png";
import pix from "@/app/images/pix-qrcode.png";
import { useRef } from "react";

const Page = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSupport = () => {
    console.log("Nome:", nameRef.current?.value);
    console.log("Email:", emailRef.current?.value);
    console.log("Mensagem:", messageRef.current?.value); 
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.leftColumn}>
          <h2>Sobre o Projeto</h2>
          <p>
            Este projeto foi criado para
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>

          <br/>
          <h2>Contribua</h2>
          <label>Nome</label>
          <div className={styles.formGroup}>
            <input 
              type="text" 
              placeholder="João"
              ref={nameRef}
            />
          </div>
          <label>Email</label>
          <div className={styles.formGroup}>
            <input 
              type="email" 
              placeholder="email@joaosilva.com"
              ref={emailRef}
            />
          </div>
          <label>Mensagem</label>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Escreva sua mensagem aqui"
              style={{ width: '100%', height: '150px' }}
              ref={messageRef}
            />
          </div>
          <Button onClick={handleSupport}>
            Colaborar
          </Button>
        </div>

        <div className={styles.rightColumn}>
          <div>
            <Image
              src={logo}
              alt="about-logo"
              width={350}
              height={150}
              style={{ marginBottom: '110px', marginLeft: '80px'}}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column',
                        alignItems: 'center', marginLeft: '100px' }}>
            <Image
              src={pix}
              alt="pix-qrcode"
              width={200}
              height={200}
            />
            <p style={{ marginTop: '10px', textAlign: 'center', fontWeight: 'bold' }}>PIX</p> 
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;