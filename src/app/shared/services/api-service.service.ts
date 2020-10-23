import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment.prod';
import { CurrentDay } from '../models/currentday';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected httpClient: HttpClient) { }

  private addApiKey(url: string): string {
    return environment.api_url.concat(url, '&key=', environment.api_key);
  }

  getApiUrl(debug: string): string {
    return this.addApiKey(debug);
  }

  getCurrent(location: string): Observable<ApiResponse<CurrentDay>> {
    let url: string = this.addApiKey("current.json?q=".concat(location));
    return this.httpClient.get<ApiResponse<CurrentDay>>(url);
  }

  getForecast(location: string): Observable<ApiResponse<Object>> {
    let url: string = this.addApiKey("forecast.json?q=".concat(location,"&days=7"));
    return this.httpClient.get<ApiResponse<CurrentDay>>(url);
  }

  getAstronomy(location: string): Observable<ApiResponse<Object>> {
    let url: string = this.addApiKey("astronomy.json?q=".concat(location));
    return this.httpClient.get<ApiResponse<CurrentDay>>(url);
  }
}
