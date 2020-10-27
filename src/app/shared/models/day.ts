import { Condition } from './condition';

export interface Day{
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number,
    avgtemp_c: number,
    avgtemp_f: number,
    maxwind_mph: number,
    maxwind_kph: number,
    totalprecip_mm:number,
    totalprecip_in:number,
    avgvis_km: number,
    avgvis_miles:number,
    avghumidity: number,
    daily_will_it_rain: number,
    daily_chance_of_rain: string,
    daily_will_it_snow: number,
    daily_chance_of_snow: string
    condition: Condition,
    uv:number
}


/**
 *                 "day": {
                    "maxtemp_c": 13.6,
                    "maxtemp_f": 56.5,
                    "mintemp_c": 9.2,
                    "mintemp_f": 48.6,
                    "avgtemp_c": 10.8,
                    "avgtemp_f": 51.4,
                    "maxwind_mph": 15.4,
                    "maxwind_kph": 24.8,
                    "totalprecip_mm": 4.0,
                    "totalprecip_in": 0.16,
                    "avgvis_km": 9.6,
                    "avgvis_miles": 5.0,
                    "avghumidity": 78.0,
                    "daily_will_it_rain": 1,
                    "daily_chance_of_rain": "98",
                    "daily_will_it_snow": 0,
                    "daily_chance_of_snow": "0",
                    "condition": {
                        "text": "Patchy rain possible",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
                        "code": 1063
                    },
                    "uv": 1.0
                },
 * 
 */