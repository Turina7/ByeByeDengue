import React from 'react';
import PropTypes from 'prop-types';
import styles from './article.module.css';

interface ArticleProps {
  title: string;
  author: string;
  text: string;
}

const Article: React.FC<ArticleProps> = ({ title, author, text }) => {
  // Dividir o texto em parágrafos onde houver uma quebra de linha dupla '\n\n'
  const paragraphs = text.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className={styles.article}>
      <h1 className={styles['article-title']}>{title}</h1>
      <h2 className={styles['article-author']}>By {author}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles['article-text']}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};


Article.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Article;
