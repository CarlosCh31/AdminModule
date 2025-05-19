import {inject, Injectable} from '@angular/core';
import {ActivityDTO} from './activity.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/volunteers';

  constructor() { }

  getAll() {
    return this.httpClient.get<any[]>(`${this.baseUrl}/getAll`);
  }

  update(data: any) {
    return this.httpClient.put(`${this.baseUrl}/edit`, data)
  }

  delete(data: any) {
    return this.httpClient.put(`${this.baseUrl}/delete`, data)
  }
}
