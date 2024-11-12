"use client";

import Image from "next/image";
import styles from "./feedbackSection.module.css";
import { useEffect, useState } from "react";
import { getFeedbacks } from "@/actions/actions";
import defaultAvatar from "@/app/images/default-avatar.jpg";

type FeedbackWithUser = {
  id: number;
  feedback: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    imageUrl: string | null;
    role?: string;
  };
};

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<FeedbackWithUser[]>([]);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const response = await getFeedbacks();
        setFeedbacks(response.slice(0, 3));
      } catch (error) {
        console.error("Error loading feedbacks:", error);
      }
    }

    loadFeedbacks();
  }, []);

  return (
    <section className={styles.feedbacks}>
      <h2>Feedbacks</h2>
      <div className={styles.feedbackGrid}>
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className={styles.feedbackItem}>
            <p>{feedback.feedback}</p>
            <div className={styles.feedbackAuthor}>
              <Image 
                src={feedback.user.imageUrl || defaultAvatar} 
                alt={feedback.user.name} 
                width={50} 
                height={50}
                className={styles.authorImage}
              />
              <div>
                <h4>{feedback.user.name}</h4>
                <p>{feedback.user.role || 'Membro'}</p>
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