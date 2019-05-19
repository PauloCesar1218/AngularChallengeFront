import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL, environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Info } from '../../shared/models/info';



@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor( public http: HttpClient ) { }

  persistInfo(info: Info): Observable<any> {
    return this.http.post<any>(`${SERVER_URL}${environment.API.setInformation}`, info);
  }

  getInfo(): Observable<Info[]> {
    return this.http.get<Info[]>(`${SERVER_URL}${environment.API.getInformation}`);
  }
}
