import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface ActivityDTO {
  id: number;
  name: string;
  type: string;
  description: string;
  date: string; // ISO format, e.g., "2025-03-31"
  time: string; // ISO time, e.g., "14:30:00"
  duration: string;
  modality: string;
  location: string;
  maxParticipants: number;
  minimumAge: number;
  maximumAge: number;
  state: string;
  administratorEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/activity';
  workshopUrl: string = 'http://localhost:8080/api/workshops';
  talkForumUrl: string= 'http://localhost:8080/api/talk-forums';
  sportUrl: string= 'http://localhost:8080/api/sports';

  getAll(): Observable<ActivityDTO[]> {
    return this.httpClient.get<ActivityDTO[]>(`${this.baseUrl}/getAll`);
  }

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }

  registerSport(data: any): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.sportUrl}/register`, data);
  }

  registerWorkshop(data: any) {
    return this.httpClient.post<{ message: string }>(`${this.workshopUrl}/register`, data);
  }
  registerTalkForum(data:any){
    return this.httpClient.post<{ message: string }>(`${this.talkForumUrl}/register`, data)
  }

  update(data: any) {
    return this.httpClient.put(`${this.baseUrl}/update`, data)
      .pipe(tap((result) => {
        console.log('Actividad actualizada:', result);
      }));
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`)
      .pipe(tap(() => {
        console.log(`Actividad con ID ${id} eliminada`);
      }));
  }
}
