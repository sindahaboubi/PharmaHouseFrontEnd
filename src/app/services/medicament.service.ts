import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicament } from 'src/app/classes/medicament.model';
import { Unite } from '../classes/unite';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private baseUrl = 'http://localhost:8081/medicaments';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Medicament> {
    return this.http.get<Medicament>(`${this.baseUrl}/${id}`);
  }

  create(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl, formData, { headers });  }


  update(id: number,formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${this.baseUrl}/${id}`, formData, { headers });  }



  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(this.baseUrl);
  }

  getUnites(): Observable<Unite[]> {
    return this.http.get<Unite[]>('http://localhost:8081/unites');
  }
}
