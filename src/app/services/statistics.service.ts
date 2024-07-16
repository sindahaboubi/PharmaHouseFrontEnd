// src/app/services/statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'http://localhost:8081/statistics';

  constructor(private http: HttpClient) { }

  getMostConsumedMedications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/most-consumed-medications`);
  }

  getCommandesByDate(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/commandes-by-current-year`
    );
  }

  getMonthlyCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/monthly-commandes`);
  }

  getTopMedications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top-medications`);
  }


  getOrderStatusPieChartData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pie-chart-data`);
  }
}
