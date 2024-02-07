import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skid } from 'take2-digital-forms-data-model';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // changed to use a proxy to avoid CORS issues
  // apiUrl = "http://localhost:3000/api";

  apiUrl = "/api";
  constructor(private http: HttpClient) { }

  getAllSkids(): Observable<Skid[]> {
    return this.http.get<Skid[]>(this.apiUrl + '/skids');
  }

  updateSkid(skid: Skid): Observable<Skid> {
    console.log('data.service updateSkid:', skid);
    console.log('data.service updateSkid stringified:',  JSON.stringify(skid));
    console.log('data.service url:',  this.apiUrl + '/skids/' + skid.number.toString(), JSON.stringify(skid) );
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Skid>(this.apiUrl + '/skids/' + skid.number.toString(), JSON.stringify(skid), { headers });
  }

}
