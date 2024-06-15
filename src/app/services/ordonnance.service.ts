import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordonnance } from '../classes/ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  private baseUrl = 'http://localhost:8081/ordonnances';

  constructor(private http: HttpClient) { }

  getAllOrdonnances(): Observable<Ordonnance[]> {
    return this.http.get<Ordonnance[]>(`${this.baseUrl}/all`);
  }
}
