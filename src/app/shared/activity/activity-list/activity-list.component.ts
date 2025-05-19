import { Component, OnInit, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityEditDialogComponent } from '../activity-edit-dialog/activity-edit-dialog.component';
import { NgIf } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ActivityService } from '../../../core/activity.service';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatIconButton,
    MatIcon,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSortModule,
    MatMenuModule
  ],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit {
  private activityService = inject(ActivityService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  readonly itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'type', 'date', 'time', 'location', 'state', 'actions'];
  activities: any[] = [];
  sortedData: any[] = [];

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activityService.getAll().subscribe({
      next: (data: any[]) => {
        this.activities = data;
        this.sortedData = [...this.activities];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error cargando actividades:', err);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  sortBy(property: string, direction: 'asc' | 'desc') {
    this.sortedData = [...this.activities].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (property === 'date') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  sortByState(order: 'active' | 'inactive') {
    this.sortedData = [...this.activities].sort((a, b) => {
      if (order === 'active') {
        return a.state === 'activo' ? -1 : 1;
      } else {
        return a.state === 'activo' ? 1 : -1;
      }
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updateActivity(activity: any) {
    const dialogRef = this.dialog.open(ActivityEditDialogComponent, {
      width: '400px',
      data: { ...activity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadActivities();
      }
    });
  }

  deleteActivity(id: number) {
    this.activityService.delete(id).subscribe({
      next: () => {
        this.loadActivities();
      },
      error: (err) => {
        console.error('Error eliminando actividad:', err);
      },
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.sortedData.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.sortedData.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
