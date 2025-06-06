import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/notifications/send-email';

  constructor(private http: HttpClient) {}

  sendWelcomeEmail(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }
}
