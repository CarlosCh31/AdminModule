import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Chart, registerables } from 'chart.js';



Chart.register(...registerables); // Registro global de Chart.js

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);

  stats = signal({
    totalUsers: 0,
    totalVolunteers: 0,
    totalAthletes: 0,
    totalEvents: 0
  });

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    this.http.get<any>('http://localhost:8080/api/admin/dashboard-stats').subscribe(data => {
      this.stats.set(data.stats);
      this.renderCharts(data);
    });
  }

  renderCharts(data: any) {
    new Chart('volunteerChart', {
      type: 'pie',
      data: {
        labels: ['Disponibles', 'No Disponibles'],
        datasets: [{ data: [data.volunteers.available, data.volunteers.unavailable], backgroundColor: ['#42A5F5', '#FF6384'] }]
      }
    });

    new Chart('athleteChart', {
      type: 'bar',
      data: {
        labels: ['TEA', 'Down', 'R. Desarrollo', 'PCI'],
        datasets: [{ label: 'Atletas', data: [data.athletes.tea, data.athletes.down, data.athletes.development, data.athletes.pci], backgroundColor: ['#66BB6A', '#FFA726', '#AB47BC', '#29B6F6'] }]
      }
    });
  }
}
