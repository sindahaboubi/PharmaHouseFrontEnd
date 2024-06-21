import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordonnance } from '../classes/ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  private baseUrl = 'http://localhost:8081/ordonnances';

  constructor(private http: HttpClient) { }

  getOrdonnancesByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  addOrdonnance(photo: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('userId', userId.toString());
    return this.http.post<any>(`${this.baseUrl}/add`, formData);
  }

}
