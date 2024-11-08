import Image from "next/image";
import styles from "./newsSection.module.css";
import mosquito from "@/app/images/mosquito.jpg";
import hospital from "@/app/images/hospital.png";

export function NewsSection() {
  return (
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
  );
}