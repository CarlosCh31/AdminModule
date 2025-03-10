import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {routes} from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/admin';

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }
  getAll():any {
    return this.httpClient.get(`${this.baseUrl}/getAll`);
  }
  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }
  edit(data: any) {
    return this.httpClient.put(`${this.baseUrl}/edit`, data)
        .pipe(tap((result) => {
          localStorage.setItem('authUser', JSON.stringify(result));
        }));
  }
  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
