import styles from "./supportSection.module.css"
import Link from "next/link";

export function SupportSection() {
  return(
    <section className={styles.support}>
      <h2>Apoie nosso projeto!</h2>
      <div className={styles.supportButtons}>
        <Link href="/feedback" className={styles.buttonLink}>
          <button className={styles.donateButton}>Doar</button>
        </Link>
        <Link href="/feedback" className={styles.buttonLink}>
          <button className={styles.feedbackButton}>Dar Feedback</button>
        </Link>
      </div>
    </section>
  )
}