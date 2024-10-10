import React from 'react';
import PropTypes from 'prop-types';
import './article.module.css';

interface ArticleProps {
  title: string;
  author: string;
  text: string;
}

const Article: React.FC<ArticleProps> = ({ title, author, text }) => {
  const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');
  
  return (
    <div className="article">
      <h1 className="article-title">{title}</h1>
      <h2 className="article-author">By {author}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="article-text">{paragraph}</p>
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
