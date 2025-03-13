import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/activity'; // Ajusta la URL según tu backend

  // Obtener todas las actividades
  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAll`);
  }

  // Registrar una nueva actividad
  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  // Editar una actividad existente
  update(data: any) {
    return this.httpClient.put(`${this.baseUrl}/update/${data.id}`, data)
      .pipe(tap((result) => {
        console.log('Actividad actualizada:', result);
      }));
  }

  // Eliminar una actividad
  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`)
      .pipe(tap(() => {
        console.log(`Actividad con ID ${id} eliminada`);
      }));
  }
}
