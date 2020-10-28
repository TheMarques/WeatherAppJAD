import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment.prod';
import { CurrentDay } from '../models/currentday';
import { Astro } from '../models/astro';
import { Forecast } from '../models/forecast';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected httpClient: HttpClient) { }

  private addApiKey(url: string): string {
    return environment.api_url.concat(url, '&key=', environment.api_key, '&lang=pt');
  }

  getForecast(location: string): Observable<ApiResponse> {
    let url: string = this.addApiKey("forecast.json?q=".concat(location,"&days=7"));
    return this.httpClient.get<ApiResponse>(url);
  }
  
}
