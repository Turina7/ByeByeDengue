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
        <Link href="/mapas" className={styles.exploreItem}>
          <Image src={campaignImage} alt="Mapa de unidades de atendimento" />
          <h3>Encontre unidades de atendimento</h3>
          <p>
            Localize hospitais, UPAs e ONGs de combate à dengue próximos a você. 
            Nosso mapa interativo mostra os pontos de atendimento em sua região e 
            fornece informações essenciais como endereço, telefone e horário de funcionamento. 
            Se você representa uma ONG que atua no combate à dengue, entre em contato para aparecer em nosso mapa.
          </p>
        </Link>
      </div>
    </section>
  );
}
