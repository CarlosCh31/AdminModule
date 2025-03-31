import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/athletes'; // Ajusta la URL según tu backend

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAll`);
  }

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  update(data: any) {
    return this.httpClient.put(`${this.baseUrl}/update`, data)
        .pipe(tap((result) => {
          console.log('Atleta actualizado:', result);
        }));
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`)
        .pipe(tap(() => {
          console.log(`Atleta con ID ${id} eliminado`);
        }));
  }
}
