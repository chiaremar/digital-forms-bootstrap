import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skid } from 'take2-digital-forms-data-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // apiUrl = "http://localhost:3000/api";

  apiUrl = "/api";
  constructor(private http: HttpClient) { }

  getAllSkids(): Observable<Skid[]> {
    return this.http.get<Skid[]>(this.apiUrl + '/skids');
  }

}
