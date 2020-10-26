import { Hour} from './hour'

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
}


/**
 *                 "day": {
                    "maxtemp_c": 15.6,
                    "maxtemp_f": 60.1,
                    "mintemp_c": 12.0,
                    "mintemp_f": 53.6,
                    "avgtemp_c": 13.5,
                    "avgtemp_f": 56.3,
                    "maxwind_mph": 12.5,
                    "maxwind_kph": 20.2,
                    "totalprecip_mm": 0.1,
                    "totalprecip_in": 0.0,
                    "avgvis_km": 10.0,
                    "avgvis_miles": 6.0,
                    "avghumidity": 76.0,
                    "daily_will_it_rain": 0,
                    "daily_chance_of_rain": "0",
                    "daily_will_it_snow": 0,
                    "daily_chance_of_snow": "0",
                },
 * 
 */