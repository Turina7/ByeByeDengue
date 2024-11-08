import React from "react";
import Button from "../button/button";
import styles from './forumCard.module.css';

export interface cardContent {
    header: string;
    post: string;
    message: string;
    comments: string[];
}

interface forumCardProps {
    cardContent: cardContent;
    active: boolean;
    handleComment: () => void;
}

const ForumCard: React.FC<forumCardProps> = ({
    cardContent,
    active,
    handleComment,
}) => {

    return (
        <div className={`${styles.forumCard} ${active ? styles.active : ""}`}>

            <div className={styles.forumCardHeader}>
                {cardContent.header}
            </div>

            <div className={styles.forumCardPost}>
                {cardContent.post}
            </div>

            <div className={styles.forumCardMessage}>
                {cardContent.message}
            </div>

            <div className={styles.forumCardComments}>
                <strong>
                    <span style={{ color: '#D70000' }}>
                        Comentários {cardContent.comments.length}</span>
                </strong>
                <div>{cardContent.comments[0] ?? "Sem comentários"}</div>
            </div>

            <Button
                onClick={() => handleComment()}
            >
                Comentar
            </Button>
        </div>
    );
}

export default ForumCard;