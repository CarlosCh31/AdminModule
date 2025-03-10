import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

class DashboardService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/admin';

  dashboardData (data: any) {
    return this.httpClient.get(`${this.baseUrl}/register`, data);
  }

}
