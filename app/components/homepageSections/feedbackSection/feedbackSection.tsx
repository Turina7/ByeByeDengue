import Image from "next/image";
import styles from "./feedbackSection.module.css"
import willSmithImage from "@/app/images/will-smith.jpg";
import drDrauzioImage from "@/app/images/dr-drauzio.jpg";
import bobMarleyImage from "@/app/images/bob-marley.jpg";

export function FeedbackSection() {
	return (
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
		</section>
	)
}