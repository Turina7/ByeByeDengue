import axios from 'axios';


interface SisaWebResponse {
    area: string;
    censitario: string;
    trabalhados: string;
    nao_trabalhados: string;
    focal: string;
    perifocal: string;
    nebulizacao: string;
    mecanico: string;
    alternativo: string;
  }
  

/**
 * Fetches data from the SISA Web API.
 * 
 * @param tipo - The type of data to fetch.
 * @param inicio - The start date in YYYY-MM-DD format.
 * @param final - The end date in YYYY-MM-DD format.
 * @returns A Promise resolving to the JSON data returned by the API.
 * @throws An error if the request fails.
 */
export async function fetchSisaData(
    tipo: string,
    inicio: string,
    final: string
): Promise<SisaWebResponse[]> {
    const baseUrl = 'https://vigent.saude.sp.gov.br/sisaweb_api/dados.php';

    // Construct query parameters
    const params = new URLSearchParams({
        tipo,
        id: '471',
        inicio,
        final,
        exec: '2',
        censitario: '1',
    });

    const url = `${baseUrl}?${params.toString()}`;

    try {

        const response = await axios.get<SisaWebResponse[]>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching SISA data:', error);
        throw new Error('Failed to fetch data from SISA Web API.');
    }
}


(async () => {
    try {
        const data = await fetchSisaData('4', '2024-09-01', '2024-09-24');
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
