import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8080/api';
  // Ajusta aquí el endpoint base correcto

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/regions`);
  }

  getProvinces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/provinces`);
  }

  getCantons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cantons`);
  }
}
