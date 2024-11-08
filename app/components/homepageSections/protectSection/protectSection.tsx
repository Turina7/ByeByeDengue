import Image from "next/image";
import styles from "./protectSection.module.css";
import vetor from "@/app/images/Vetor.jpg";
import symptoms from "@/app/images/Sintomas.png";
import prevention from "@/app/images/Prevencao.jpeg";

export function ProtectSection() {
  return (
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
  );
}