// app/api/dengue-news/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.gdeltproject.org/api/v2/doc/doc?query=dengue%20(sourcelang:eng%20OR%20sourcelang:por)&maxrecords=30&format=json');
    return NextResponse.json(response.data.articles || []);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ message: 'Error fetching news data' }, { status: 500 });
  }
}

//Caro leitor, se tiver paciencia gostaria que você trocasse essa query seca por só o url com os params, pq eu tentei muito
// e não deu. Abraços