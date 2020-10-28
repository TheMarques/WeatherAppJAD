import { Forecastday } from './forecastDay';

export interface Forecast {
    forecastday: Forecastday[],
}

/***
 * 
 * Exemplo : Para um Forecast de 2 Dias
 * 1. Abre Forecast
 * 2. Abre ForecastDay ---> Array conforme o número de dias , neste caso 2 dias.
 * 3. Abre 1º Dia --> 
 * 4. Abre Astro
 * 5. Array de 24 , uma posição por hora.
 * -------------------------------- ( Segunda Posição no array de ForecastDay) ---------------------
 * 6. Abre 2º Dia
 * 7. Abre Astro
 * 8. Array de 24 , uma posição por hora. 
 */