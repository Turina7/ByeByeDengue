import React from 'react';
import styles from './linkArtigo.module.css';

interface LinkArtigoProps {
    title: string;
    author: string;
    date: string;
    link: string;
}

const LinkArtigo: React.FC<LinkArtigoProps> = ({ title, author, date, link }) => {
    return (
        <div className={styles.artigoContainer}>
            <a href={link} className={styles.title} target="_blank" rel="noopener noreferrer">
                {title}
            </a>
            <span className={styles.authorDate}>
                {` - by ${author}, ${date}`}
            </span>
        </div>
    );
};

export default LinkArtigo;
