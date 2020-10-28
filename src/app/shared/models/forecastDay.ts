import { Astro } from './astro';
import { Day } from "./day";
import { Hour } from './hour';

export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: Day;
    astro: Astro;
    hour: Hour[];
}

/**
 *
 * ForeCastDay precisa de um array de Dias, e cada dia tem um array [24] de horas
 */
/**
 * 
 *         "forecastday": [
            {
                "date": "2020-10-26",
                "date_epoch": 1603670400,
                "day": {
                    "maxtemp_c": 13.1,
                    "maxtemp_f": 55.6,
                    "mintemp_c": 9.3,
                    "mintemp_f": 48.7,
                    "avgtemp_c": 11.0,
                    "avgtemp_f": 51.7,
                    "maxwind_mph": 12.3,
                    "maxwind_kph": 19.8,
                    "totalprecip_mm": 0.6,
                    "totalprecip_in": 0.02,
                    "avgvis_km": 9.8,
                    "avgvis_miles": 6.0,
                    "avghumidity": 70.0,
                    "daily_will_it_rain": 1,
                    "daily_chance_of_rain": "92",
                    "daily_will_it_snow": 0,
                    "daily_chance_of_snow": "0",
                    "condition": {
                        "text": "Patchy rain possible",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
                        "code": 1063
                    },
                    "uv": 1.0
                },
 */
