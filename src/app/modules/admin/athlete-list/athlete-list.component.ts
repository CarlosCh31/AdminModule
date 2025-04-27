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
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

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
    MatSortModule,
    MatMenuModule,
  ],
  templateUrl: './athlete-list.component.html',
  styleUrl: './athlete-list.component.scss',
})
export class AthleteListComponent implements OnInit {
  private athleteService = inject(AthleteService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  displayedColumns: string[] = ['id', 'name', 'age', 'phone_number', 'laterality', 'disability_type', 'weight', 'height', 'actions'];
  athletes: any[] = [];
  sortedData: any[] = [];

  ngOnInit() {
    this.loadAthletes();
  }

  loadAthletes() {
    this.athleteService.getAll().subscribe({
      next: (data: any[]) => {
        this.athletes = data.map(athlete => ({
          ...athlete,
          name: athlete.name,
          age: this.calculateAge(athlete.birthdate || athlete.person?.birth_date)
        }));
        this.sortedData = [...this.athletes];
      },
      error: (err) => {
        console.error('Error cargando atletas:', err);
      },
    });
  }

  calculateAge(birthdate: Date | string): number {
    if (!birthdate) {
      console.warn('Fecha de nacimiento no proporcionada');
      return 0;
    }

    try {
      const birth = new Date(birthdate);
      if (isNaN(birth.getTime())) {
        console.warn('Fecha de nacimiento inválida:', birthdate);
        return 0;
      }

      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      return age;
    } catch (e) {
      console.error('Error calculando edad:', e);
      return 0;
    }
  }

  sortByName(direction: 'asc' | 'desc') {
    this.sortedData = [...this.athletes].sort((a, b) => {
      const nameA = (a.name || '').toString().toLowerCase();
      const nameB = (b.name || '').toString().toLowerCase();

      if (nameA < nameB) return direction === 'asc' ? -1 : 1;
      if (nameA > nameB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  sortByAge(direction: 'asc' | 'desc') {
    this.sortedData = [...this.athletes].sort((a, b) => {
      if (direction === 'asc') {
        return a.age - b.age;
      }
      return b.age - a.age;
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
        this.loadAthletes();
      },
      error: (err) => {
        console.error('Error eliminando atleta:', err);
      },
    });
  }

}

