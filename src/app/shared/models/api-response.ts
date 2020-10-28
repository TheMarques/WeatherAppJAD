import { Current } from './current';
import { Forecast } from './forecast';
import { Location } from './location';

export interface ApiResponse {
    location:Location,
    current:Current,
    forecast:Forecast,
    alert:any
}

