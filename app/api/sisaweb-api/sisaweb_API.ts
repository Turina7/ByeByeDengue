import axios from 'axios';

interface ApiParams {
  tipo: number;
  id: number;
  inicio: string;
  final: string;
  exec: number;
  cenario: number;
}

export async function fetchSisawebData(params: ApiParams) {
  const url = 'https://vigent.saude.sp.gov.br/sisaweb_api/dados.php';

  try {
    const response = await axios.get(url, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


fetchSisawebData({
  tipo: 4,
  id: 471,
  inicio: '2024-09-01',
  final: '2024-09-24',
  exec: 2,
  cenario: 1
});
