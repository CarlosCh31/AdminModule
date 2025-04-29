import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {routes} from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  private _isLoggedIn = false;
  baseUrl = 'http://localhost:8080/api/admin';
  private userRole: string = '';
  private _currentUser: any = null;

  register(data: any) {
    return this.httpClient.post(`${this.baseUrl}/register`, data);
  }
  getAll():any {
    return this.httpClient.get(`${this.baseUrl}/getAll`);
  }
  users():any {
    return this.httpClient.get(`${this.baseUrl}/users`);
  }
  login(credentials: { email: string; password: string }) {
    return this.httpClient.post<{ token: string; role: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        this._currentUser = res;
        localStorage.setItem('authUser', res.token);
        this.userRole = res.role;
        this._isLoggedIn = true;
      })
    );
  }
  edit(data: any) {
    return this.httpClient.put(`${this.baseUrl}/edit`, data)
        .pipe(tap((result) => {
          localStorage.setItem('authUser', JSON.stringify(result));
        }));
  }
  logout() {
    localStorage.removeItem('authUser');
    this._isLoggedIn = false;
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }
  getUserRole(): string {
    return this.userRole;
  }
  getCurrentUser(): any {
    return this._currentUser;
  }
  deleteAdmin(data: any){
    return this.httpClient.put(`${this.baseUrl}/delete`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }
}
