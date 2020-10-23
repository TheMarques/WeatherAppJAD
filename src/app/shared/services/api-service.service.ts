import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly url = "http://api.icndb.com/";

constructor(protected httpClient: HttpClient) {}

getJoke(id:number | "random"): Observable<ApiResponse<string>>{
  return this.httpClient.get<ApiResponse<string>>(`${this.url}/jokes/${id}`);
  }

}
