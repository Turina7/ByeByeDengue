import React from 'react';
import Article from '@/app/components/wikipageSections/article/article';
import sintomasAtitudes from './sintomasAtitudes';

const App = () => {
  const articleData = {
    title: "Sintomas e Atitudes",
    author: "Governo do Estado do Paraná (Adaptado)",
    text: sintomasAtitudes,
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

