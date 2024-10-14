import React from 'react';
import Article from '@/app/components/wikipageSections/article/article';
import prevencao from './prevencao';

const App = () => {
  const articleData = {
    title: "Prevenção",
    author: "Prefeitura de Itariri - SP",
    text: prevencao,
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

