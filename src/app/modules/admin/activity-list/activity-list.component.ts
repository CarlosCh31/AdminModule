import { Component, OnInit, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityEditDialogComponent } from '../activity-edit-dialog/activity-edit-dialog.component';
import { NgIf } from '@angular/common';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {ActivityService} from '../../../core/activity.service';

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

  ],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit {
  private activityService = inject(ActivityService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'description', 'date', 'time', 'duration', 'location', 'modality', 'max_participants', 'state', 'actions'];
  activities: any[] = [];

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    const activitiesObservable: Observable<any[]> = this.activityService.getAll();
    activitiesObservable.subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.error('Error cargando actividades:', err);
      },
    });
  }

  updateActivity(activity: any) {
    const dialogRef = this.dialog.open(ActivityEditDialogComponent, {
      width: '400px',
      data: { ...activity },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.activities.findIndex((a) => a.id === activity.id);
        if (index !== -1) {
          this.activities[index] = { ...this.activities[index], ...result };
        }
      }
    });
  }

  deleteActivity(id: number) {
    console.log(`Eliminar actividad con ID: ${id}`);
    this.activities = this.activities.filter((activity) => activity.id !== id);
  }
}
