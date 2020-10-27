import { Condition } from "./condition";

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: string;
  will_it_snow: number;
  chance_of_snow: string;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
}

/**
 * 
 *                      "time_epoch": 1603407600,
                        "time": "2020-10-23 00:00",
                        "temp_c": 12.6,
                        "temp_f": 54.7,
                        "is_day": 0,
                        "condition": {
                            "text": "Partly cloudy",
                            "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                            "code": 1003
                        },
                        "wind_mph": 4.9,
                        "wind_kph": 7.9,
                        "wind_degree": 201,
                        "wind_dir": "SSW",
                        "pressure_mb": 1010.0,
                        "pressure_in": 30.3,
                        "precip_mm": 0.0,
                        "precip_in": 0.0,
                        "humidity": 88,
                        "cloud": 48,
                        "feelslike_c": 12.1,
                        "feelslike_f": 53.8,
                        "windchill_c": 12.1,
                        "windchill_f": 53.8,
                        "heatindex_c": 12.6,
                        "heatindex_f": 54.7,
                        "dewpoint_c": 10.7,
                        "dewpoint_f": 51.3,
                        "will_it_rain": 0,
                        "chance_of_rain": "0",
                        "will_it_snow": 0,
                        "chance_of_snow": "0",
                        "vis_km": 10.0,
                        "vis_miles": 6.0,
                        "gust_mph": 6.9,
                        "gust_kph": 11.2
                    },
 */
