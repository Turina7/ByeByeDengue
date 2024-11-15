import { NextResponse } from 'next/server';
import axios from 'axios';

interface GDELTArticle {
  title: string;
  url: string;
  socialimage?: string;
  publishedAt?: string;
  sourcecountry?: string;
  language?: string;
  [key: string]: unknown;
}

interface GDELTResponse {
  articles: GDELTArticle[];
  status?: string;
  message?: string;
}

export async function GET() {
  try {
    const baseUrl = 'https://api.gdeltproject.org/api/v2/doc/doc';
    
    const dengueKeywords = [
      'dengue',
      'aedes',
      'aedes aegypti',
      'mosquito',
      'fever',
      'febre',
      'surto',
      'outbreak',
      'epidemia',
      'epidemic',
      'arbovirose',
      'arbovirus',
      'zika',
      'chikungunya',
      'febre amarela',
      'yellow fever',
      'mayaro'
    ];
    
    const params = new URLSearchParams({
      query: '(dengue OR zika OR chikungunya OR arbovirose OR arbovirus OR "aedes aegypti") (sourcelang:eng OR sourcelang:por)',
      maxrecords: '250',
      format: 'json',
      sort: 'datedesc',
      timespan: '30days'
    });

    const url = `${baseUrl}?${params.toString()}`;
    
    const response = await axios.get<GDELTResponse>(url);
    const articles = response.data.articles || [];

    // Função para normalizar texto (remover espaços extras, pontuação e converter para minúsculas)
    const normalizeText = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };
    
    const seenTitles = new Set<string>();
    const seenUrls = new Set<string>();

    const validArticles = articles
      .filter((article: GDELTArticle) => {
        if (!article.title || !article.url) return false;

        const normalizedTitle = normalizeText(article.title);
        
        if (seenTitles.has(normalizedTitle) || seenUrls.has(article.url)) {
          return false;
        }

        const hasKeywordInTitle = dengueKeywords.some(keyword => 
          normalizedTitle.includes(normalizeText(keyword))
        );
        
        if (!hasKeywordInTitle) return false;

        seenTitles.add(normalizedTitle);
        seenUrls.add(article.url);
        
        if (article.socialimage) {
          try {
            const imageUrl = new URL(article.socialimage);
            article.socialimage = imageUrl.toString();
            return true;
          } catch {
            article.socialimage = '';
            return true;
          }
        }
        
        return true;
      })
      .slice(0, 30);

    if (validArticles.length === 0) {
      return NextResponse.json(
        { message: 'Nenhuma notícia sobre arboviroses encontrada' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(validArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar notícias' }, 
      { status: 500 }
    );
  }
}