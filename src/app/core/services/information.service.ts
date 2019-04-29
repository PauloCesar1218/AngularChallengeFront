import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL, environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor( private http: HttpClient ) { }

  persistInfo(info): Observable<any> {
    return this.http.post(`${SERVER_URL}${environment.API.setInformation}`, info);
  }

  getInfo(): Observable<any> {
    return this.http.get(`${SERVER_URL}${environment.API.getInformation}`);
  }
}
