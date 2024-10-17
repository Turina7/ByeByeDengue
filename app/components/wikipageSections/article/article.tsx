import React from 'react';
import PropTypes from 'prop-types';
import styles from './article.module.css';

interface ArticleProps {
  title: string;
  author: string;
  text: string;
}

interface LinkItem {
  term: string;
  url: string;
}

const linkItems: LinkItem[] = [
  { term: 'Aedes aegypti', url: '/wiki/aedes-aegypti' },
  { term: 'sintomas', url: '/wiki/sintomas-atitudes' },
  { term: 'prenveção', url: '/wiki/prevencao' },
];

const linkifyText = (text: string) => {
  let result: (string | JSX.Element)[] = [text];

  linkItems.forEach(({ term, url }) => {
    result = result.flatMap(part =>
      typeof part === 'string'
        ? part.split(new RegExp(`(${term})`, 'gi')).map((subPart, index) =>
            subPart.toLowerCase() === term.toLowerCase() ? (
              <a href={url} className={styles.link} key={`${term}-${index}`}>
                {term}
              </a>
            ) : (
              subPart
            )
          )
        : part
    );
  });

  return result;
};

const Article: React.FC<ArticleProps> = ({ title, author, text }) => {
  const paragraphs = text.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  return (
    <div className={styles.article}>
      <h1 className={styles['article-title']}>{title}</h1>
      <h2 className={styles['article-author']}>By {author}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles['article-text']}>
          {linkifyText(paragraph)}
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
