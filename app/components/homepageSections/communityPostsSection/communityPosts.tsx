import Image from "next/image";
import styles from "./communityPosts.module.css";
import Link from "next/link";
import meme1 from "@/app/images/meme1.jpg";
import meme2 from "@/app/images/meme2.png";

export function CommunityPostsSection() {
  return (
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
  );
}