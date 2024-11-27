import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import styles from "./exploreSection.module.css";
import mosquitoImage from "@/app/images/mosquito.jpg";
import campaignImage from "@/app/images/campaign.jpg";

export function ExploreSection() {
  return (
    <section className={styles.explore}>
      <h2>Explore</h2>
      <div className={styles.exploreGrid}>
        {/* Artigos Section */}
        <Link href="/wiki" className={styles.exploreItem}>
          <Image src={mosquitoImage} alt="Mosquito" />
          <h3>Artigos e pesquisas</h3>
          <p>Descubra as últimas pesquisas e artigos sobre a dengue.
		  Explore conteúdos informativos que abordam desde os sintomas e formas de prevenção até os avanços científicos no combate ao mosquito transmissor. Mantenha-se informado para proteger sua comunidade.</p>
        </Link>

        {/* Instituições Section */}
        <Link href="/about" className={styles.exploreItem}>
          <Image src={campaignImage} alt="Campanha de combate" />
          <h3>Apoie as instituições de combate</h3>
          <p>Junte-se às iniciativas que combatem a dengue.
		  Conheça organizações que atuam na prevenção e no controle da doença, e veja como você pode contribuir. Sua ajuda faz a diferença na luta contra o mosquito Aedes aegypti.</p>
        </Link>
      </div>
    </section>
  );
}
