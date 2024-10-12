import Image from "next/image";
import styles from "./exploreSection.module.css";
import mosquitoImage from "@/app/images/mosquito.jpg";
import campaignImage from "@/app/images/campaign.jpg";

export function ExploreSection() {
  return (
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
  );
}