import styles from "./supportSection.module.css"

export function SupportSection() {
	return(
		<section className={styles.support}>
			<h2>Apoie nosso projeto!</h2>
			<div className={styles.supportButtons}>
				<button>Doar</button>
				<button>Dar Feedback</button>
			</div>
		</section>
	)
}
