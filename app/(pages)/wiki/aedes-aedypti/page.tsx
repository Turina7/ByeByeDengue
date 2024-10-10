import React from 'react';
import Article from '@/app/components/article/article';
import AedesInfo from './AedesInfo';

const App = () => {
  const articleData = {
    title: "Aedes Aedypti - O vetor",
    author: "Governo do Espirito Santo",
    text: AedesInfo(),
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
