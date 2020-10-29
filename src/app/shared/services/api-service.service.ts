import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment.prod';
import { ApiIpResponse } from '../models/api-ip-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected httpClient: HttpClient) { }

  /**
   * Retorna uma string com o url completo
   * Adiciona o link, a chave e a linguagem ao url introduzido
   * Para comunicar com a API
   * @param url 
   */
  private addApiKey(url: string): string {
    return environment.api_weather_url.concat(url, '&key=', environment.api_weather_key, '&lang=pt');
  }

  /**
   * Retorna uma Resposta da Api com informação da localização
   * passada no parametro de entrada
   * @param location 
   */
  getForecast(location: string): Observable<ApiResponse> {
    let url: string = this.addApiKey("forecast.json?q=".concat(location,"&days=7"));
    return this.httpClient.get<ApiResponse>(url);
  }

  /**
   * Retorna uma Resposta da Api com o IP publico do utilizador
   */
  getIPAddress():Observable<ApiIpResponse> {  
    return this.httpClient.get<ApiIpResponse>(environment.api_ip_url);  
  }
  
}
