import React from 'react';
import Article from '@/app/components/article/article';
import aedesInfo from './aedesInfo';

const App = () => {
  const articleData = {
    title: "Aedes Aedypti - O vetor",
    author: "Governo do Espirito Santo",
    text: aedesInfo,
  };

  return (
    <div>
      <Article 
        title={articleData.title} 
        author={articleData.author}  
        text={articleData.text}
      />
    </div>
  );
};

export default App;

