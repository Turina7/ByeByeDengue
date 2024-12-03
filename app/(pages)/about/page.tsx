"use client";

import styles from "./about.module.css";
import Button from "@/app/components/button/button";
import Image from "next/image";
import logo from "@/app/images/about-logo.png";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.leftColumn}>
          <h2>Sobre o Projeto</h2>
          <p>  
          Este projeto nasceu como parte das atividades da disciplina de Engenharia de Software, no curso de Engenharia de Computação da Escola Politécnica da Universidade de São Paulo. Inspirado por uma pesquisa de uma doutoranda orientada pela professora responsável, que identificou a falta de recursos eficientes para centralização de dados sobre a dengue, a ideia foi apresentada à turma como meio de se estudar sobre webdev e processo de produtos. Assim, Tiago, Guilherme, João Paulo e Giovani abraçaram o desafio, transformando-o em uma solução inovadora e funcional.  
          </p>  

          <p>  
          Desenvolvido ao longo de quatro meses, o projeto reúne diversas funcionalidades em uma plataforma interativa: uma homepage atrativa, uma wiki com artigos informativos, mapas e estatísticas detalhadas sobre a disseminação da dengue, um canal para denúncias direcionadas a órgãos competentes e um fórum que incentiva o engajamento da comunidade. A proposta combina tecnologia e colaboração para enfrentar um problema de saúde pública com eficiência.  
          </p>  

          <p>  
          Criado pelos alunos do terceiro ano, este projeto reforça o papel transformador do ensino público na promoção da ciência e no desenvolvimento de soluções práticas e inovadoras. Ao contribuir diretamente para o combate à dengue e outras arboviroses, destaca-se como exemplo do impacto positivo da educação na sociedade.  
          </p>  
          <br/>
          <Button onClick={() => router.push('/feedback')}>
            Colabore!
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
        </div>
      </section>
    </main>
  );
};

export default Page;