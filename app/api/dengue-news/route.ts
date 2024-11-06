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
    
    const params = new URLSearchParams({
      query: 'dengue (sourcelang:eng OR sourcelang:por)',
      maxrecords: '30',
      format: 'json',
      sort: 'datedesc'
    });

    const url = `${baseUrl}?${params.toString()}`;
    
    const response = await axios.get<GDELTResponse>(url);
    const articles = response.data.articles || [];
    
    const validArticles = articles.filter(
      (article: GDELTArticle) => article.title && article.url
    );

    return NextResponse.json(validArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar notícias' }, 
      { status: 500 }
    );
  }
}