import {Component, inject, OnInit} from '@angular/core';
import {ActivityService} from '../../../core/activity.service';
import {VolunteerService} from '../../../core/volunteer.service';
import {MatDialog} from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {AdminEditDialogComponent} from '../../../modules/admin/admin-edit-dialog/admin-edit-dialog.component';
import {VolunteerEditDialogComponent} from '../volunteer-edit-dialog/volunteer-edit-dialog.component';

@Component({
  selector: 'app-volunteer-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatIconButton,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './volunteer-list.component.html',
  styleUrl: './volunteer-list.component.scss'
})
export class VolunteerListComponent implements OnInit {
  private volunteerService = inject(VolunteerService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'sportExperience', 'actions'];
  volunteers: any[] = [];


  ngOnInit(): void {
    this.loadVolunteers();
  }

  private loadVolunteers() {
    const activitiesObservable: Observable<any[]> = this.volunteerService.getAll();
    activitiesObservable.subscribe({
      next: (data) => {
        this.volunteers = data;
        console.log('Contenido del observable:', data);
      },
      error: (err) => {
        console.error('Error cargando actividades:', err);
      },
    });
  }

  deleteVolunteer(volunteer: any) {
    this.volunteerService.delete(volunteer).subscribe({
      next: () => {
        console.log('Eliminado');
        this.loadVolunteers();
      },
      error: (err: any) => {
        console.error('Error al eliminar:', err);
        this.loadVolunteers();
      }
    });
  }

  editVolunteer(volunteer: any) {
    const dialogRef = this.dialog.open(VolunteerEditDialogComponent, {
      width: '400px',
      data: { ...volunteer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVolunteers()
        const index = this.volunteers.findIndex((a) => a.id === volunteer.id);
        if (index !== -1) {
          this.volunteers[index] = { ...this.volunteers[index], ...result };
        }
      }
    });

  }
}
