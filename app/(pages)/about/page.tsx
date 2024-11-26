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
          Este projeto nasceu como parte das atividades da disciplina de Engenharia de Software, no curso de Engenharia de Computação da Escola Politécnica da Universidade de São Paulo. Inspirado por uma pesquisa de uma doutoranda orientada pela professora responsável, que identificou a falta de recursos eficientes para centralização de dados sobre a dengue, a ideia foi apresentada à turma como meio de se estudar sobre webdev e processo de produtos. Assim, Tiago, Guilherme, João Paulo e Giovanni abraçaram o desafio, transformando-o em uma solução inovadora e funcional.  
          </p>  

          <p>  
          Desenvolvido ao longo de quatro meses, o projeto reúne diversas funcionalidades em uma plataforma interativa: uma homepage atrativa, uma wiki com artigos informativos, mapas e estatísticas detalhadas sobre a disseminação da dengue, um canal para denúncias direcionadas a órgãos competentes e um fórum que incentiva o engajamento da comunidade. A proposta combina tecnologia e colaboração para enfrentar um problema de saúde pública com eficiência.  
          </p>  

          <p>  
          Criado pelos alunos do terceiro ano, este projeto reforça o papel transformador do ensino público na promoção da ciência e no desenvolvimento de soluções práticas e inovadoras. Ao contribuir diretamente para o combate à dengue e outras arboviroses, destaca-se como exemplo do impacto positivo da educação na sociedade.  
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