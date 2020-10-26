import { Condition } from './condition';

export interface Current {
    last_updated_epoch:number,
    last_updated:string,
    temp_c:number,
    is_day:number,
    condition:Condition,
    wind_kph:number,
    wind_degree:number,
    wind_dir:string,
    pressure_mb:number,
    pressure_in:number,
    precip_mm:number,
    precip_in:number,
    humidity:number,
    cloud:number,
    feelsike_c:number,
    vis_km:number,
    uv:number,
    guest_kph:number
}


//Current, chama condition, day e hour
/*
"current": {
    "last_updated_epoch": 1603475111,
    "last_updated": "2020-10-23 18:45",
    "temp_c": 17.0,
    "temp_f": 62.6,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 6.9,
    "wind_kph": 11.2,
    "wind_degree": 300,
    "wind_dir": "WNW",
    "pressure_mb": 1025.0,
    "pressure_in": 30.8,
    "precip_mm": 0.0,
    "precip_in": 0.0,
    "humidity": 68,
    "cloud": 25,
    "feelslike_c": 17.0,
    "feelslike_f": 62.6,
    "vis_km": 10.0,
    "vis_miles": 6.0,
    "uv": 5.0,
    "gust_mph": 12.5,
    "gust_kph": 20.2
  }
*/