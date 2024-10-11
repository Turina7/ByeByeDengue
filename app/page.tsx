"use client";

import styles from './page.module.css';
import Link from "next/link";
import Image from "next/image"; 
import vetor from "@/app/images/Vetor.jpg";
import symptoms from "@/app/images/Sintomas.png";
import prevention from "@/app/images/Prevencao.jpeg";
import mosquito from "@/app/images/mosquito.jpg";
import hospital from "@/app/images/hospital.png";
import meme1 from "@/app/images/meme1.jpg";
import meme2 from "@/app/images/meme2.png";
import mosquitoImage from "@/app/images/mosquito.jpg";
import campaignImage from "@/app/images/campaign.jpg";
import willSmithImage from "@/app/images/will-smith.jpg";
import drDrauzioImage from "@/app/images/dr-drauzio.jpg";
import bobMarleyImage from "@/app/images/bob-marley.jpg";

export default function Home() {
  return (
    //TODO: sections to be dynamic
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.mainTitle}>Juntos, vamos combater a dengue!</h1>
          <h2 className={styles.subTitle}>
            Junte-se a comunidade para lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque in bibendum ante. Donec sagittis ante
            vel dolor dapibus finibus. Nunc ut eleifend diam. Suspendisse ante
            eros, feugiat quis sollicitudin ac.
          </h2>
        </div>

        <div className={styles.protect}>
          <h2>Se proteja!</h2>
          <p>
            Qualquer recipiente que acumule água, mesmo em pequena quantidade, pode se tornar um foco da dengue.
          </p>

          <div className={styles.sections}>
            <div className={styles.sectionItem}>
            <Image
              src={vetor}
              alt="O vetor"
              className={styles.vetor}
              width={150}
              height={70}
            />
              <h3>O vetor</h3>
              <p>Body text for whatever you’d like to add more to the subheading.</p>
            </div>
            <div className={styles.sectionItem}>
            <Image
              src={symptoms}
              alt="Sintomas e atitudes"
              className={styles.symptoms}
              width={150}
              height={70}
            />
              <h3>Sintomas e atitudes</h3>
              <p>Body text for whatever you’d like to expand on the main point.</p>
            </div>
            <div className={styles.sectionItem}>
            <Image
              src={prevention}
              alt="Prevenção"
              className={styles.prevention}
              width={150}
              height={70}
            />
              <h3>Prevenção</h3>
              <p>Body text for whatever you’d like to share more.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.news}>
          <h2>Notícias</h2>
          <div className={styles.newsItem}>
            <Image src={mosquito} alt="Mosquito"/>
            <div>
              <h3>Study identifies areas of Europe at risk from dengue fever due to spread of Asian tiger mosquito</h3>
              <p>As Europe grapples with the growing threat of tropical diseases brought by the Asian tiger mosquito...</p>
            </div>
          </div>
          <div className={styles.newsItem}>
            <Image src={hospital} alt="Hospital"/>
            <div>
              <h3>Dengue: 5 more die, 534 hospitalized in 24hrs</h3>
              <p>Five more deaths were reported from dengue in 24 hours till Tuesday morning, raising the number of fatalities from the...</p>
            </div>
          </div>
        </div>

        <div className={styles.communityPosts}>
          <h2>Posts da comunidade</h2>
          <div className={styles.postsContainer}>
            <div className={styles.postItem}>
              <Image src={meme1} alt="Meme 1"/>
            </div>
            <div className={styles.postItem}>
              <Image src={meme2} alt="Meme 2"/>
            </div>  
          </div>
          <div className={styles.buttonContainer}>
            <Link href = "/forum">
              <button className={styles.forumButton}>Acesse o Fórum</button>
            </Link>
          </div>
        </div>
        <section className={styles.explore}>
          <h2>Explore</h2>
          <div className={styles.exploreGrid}>
            <div className={styles.exploreItem}>
              <Image src={mosquitoImage} alt="Mosquito"/>
              <h3>Artigos e pesquisas</h3>
              <p>Lorem ipsum dolor amet, consectetuer adipiscing elit. Sed netus volutpat vitae curae finibus tortor enim venenatis.</p>
            </div>
            <div className={styles.exploreItem}>
              <Image src={campaignImage} alt="Campanha de combate"/>
              <h3>Apoie as instituições de combate</h3>
              <p>Lorem ipsum dolor amet, consectetuer adipiscing elit. Sed netus volutpat vitae curae finibus tortor enim venenatis.</p>
            </div>
          </div>
        </section>

        <section className={styles.feedbacks}>
          <h2>Feedbacks</h2>
          <div className={styles.feedbackGrid}>
            <div className={styles.feedbackItem}>
              <p>Site muito bom!</p>
              <div className={styles.feedbackAuthor}>
                <Image src={willSmithImage} alt="Will Smith" width={50} height={50} />
                <div>
                  <h4>Will Smith</h4>
                  <p>Dengue Specialist</p>
                </div>
              </div>
            </div>
            <div className={styles.feedbackItem}>
              <p>Comunidade muito engajada</p>
              <div className={styles.feedbackAuthor}>
                <Image src={drDrauzioImage} alt="Dr. Drauzio Varella" width={50} height={50} />
                <div>
                  <h4>Dr. Drauzio Varella</h4>
                  <p>Doctor</p>
                </div>
              </div>
            </div>
            <div className={styles.feedbackItem}>
              <p>Dengue nunca mais!</p>
              <div className={styles.feedbackAuthor}>
                <Image src={bobMarleyImage} alt="Bob Marley" width={50} height={50} />
                <div>
                  <h4>Bob Marley</h4>
                  <p>Scientist</p>
                </div>
              </div>
            </div>
          </div>
          <section className={styles.support}>
          <h2>Apoie nosso projeto!</h2>
          <div className={styles.supportButtons}>
            <button>Doar</button>
            <button>Dar Feedback</button>
         </div>
        </section>
        </section>
      </main>
    </div>
  );
}
