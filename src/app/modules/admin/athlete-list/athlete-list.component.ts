import { Component, OnInit, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AthleteService } from '../../../core/athlete.service';
import { AthleteEditDialogComponent } from '../athlete-edit-dialog/athlete-edit-dialog.component';
import { NgIf } from '@angular/common';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-athlete-list',
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
  templateUrl: './athlete-list.component.html',
  styleUrl: './athlete-list.component.scss',
})
export class AthleteListComponent implements OnInit {
  private athleteService = inject(AthleteService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'person_id', 'laterality', 'disability_type', 'weight', 'height', 'actions'];
  athletes: any[] = [];

  ngOnInit() {
    this.loadAthletes();
  }

  loadAthletes() {
    this.athleteService.getAll().subscribe({
      next: (data: any[]) => {
        this.athletes = data;
      },
      error: (err) => {
        console.error('Error cargando atletas:', err);
      },
    });
  }

  updateAthlete(athlete: any) {
    const dialogRef = this.dialog.open(AthleteEditDialogComponent, {
      width: '400px',
      data: { ...athlete },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.athletes.findIndex((a) => a.id === athlete.id);
        if (index !== -1) {
          this.athletes[index] = { ...this.athletes[index], ...result };
        }
      }
    });
  }

  deleteAthlete(id: number) {
    this.athleteService.delete(id).subscribe({
      next: () => {
        this.athletes = this.athletes.filter((athlete) => athlete.id !== id);
      },
      error: (err) => {
        console.error('Error eliminando atleta:', err);
      },
    });
  }
}
