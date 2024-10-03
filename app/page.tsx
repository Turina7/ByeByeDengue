"use client";

import styles from "./page.module.css"; 

export default function Home() {
  return (
    <div className={styles.ctas}>
      <main className={styles.main}>
        <div style={{ padding: "20px" }}>
          <h1>Home Page</h1>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
