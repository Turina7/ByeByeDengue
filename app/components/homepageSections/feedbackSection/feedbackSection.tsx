"use client";

import Image from "next/image";
import styles from "./feedbackSection.module.css";
import { useEffect, useState } from "react";
import { getFeedbacks } from "@/actions/actions";
import Loading from "@/app/components/loading/Loading";

type FeedbackWithUser = {
  id: number;
  feedback: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    imageUrl: string;
  };
};

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<FeedbackWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        setIsLoading(true);
        const response = await getFeedbacks();
        const processedFeedbacks: FeedbackWithUser[] = response.slice(0, 3).map(feedback => ({
          ...feedback,
          user: {
            ...feedback.user,
            imageUrl: feedback.user.imageUrl || "https://mugjkckn6xaf3d21.public.blob.vercel-storage.com/forum/00afdcce-458c-4dea-b694-80cb6d88cf59-CLy5b9sPwQsBABMU7BwwiEBUJPCAOn.jpg"
          }
        }));
        setFeedbacks(processedFeedbacks);
      } catch (error) {
        console.error("Error loading feedbacks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeedbacks();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.feedbacks}>
        <h2>Feedbacks</h2>
        <Loading message="Carregando feedbacks..." />
      </section>
    );
  }

  return (
    <section className={styles.feedbacks}>
      <h2>Feedbacks</h2>
      <div className={styles.feedbackGrid}>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackItem}>
            <p>{feedback.feedback}</p>
            <div className={styles.feedbackAuthor}>
              <Image 
                src={feedback.user.imageUrl} 
                alt={feedback.user.name} 
                width={50} 
                height={50}
                className={styles.authorImage}
              />
              <div>
                <h4>{feedback.user.name}</h4>
                <small className={styles.feedbackDate}>
                  {new Date(feedback.createdAt).toLocaleDateString('pt-BR')}
                </small>  
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}