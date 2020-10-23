import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(protected httpClient: HttpClient) {}

private addApiKey(url:string): string{
  return environment.api_url.concat(url,'&key=',environment.api_key);
}

getApiUrl():string{
  return this.addApiKey('current.json?q=Lisbon');
}

getCurrent(location:string): Observable<ApiResponse<string>>{
  return this.httpClient.get<ApiResponse<string>>(`${environment.api_url}`);
  }

}
