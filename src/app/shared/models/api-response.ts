import { Current } from './current';
import { Forecast } from './forecast';

export interface ApiResponse {
    location:Location,
    current:Current,
    forecast:Forecast,
    alert:any
}

