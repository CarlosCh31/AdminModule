import {Component, inject, OnInit} from '@angular/core';
import { AthleteService } from '../../../core/athlete.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatSort} from '@angular/material/sort';
import {ModalContactComponent} from '../modal-contact/modal-contact.component'; // Ajusta tu path real

@Component({
  selector: 'app-admin-program',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
  imports: [
    FormsModule,
    MatIconButton,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatSort,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ]
})
export class ProgramasComponent implements OnInit {
  private athleteService = inject(AthleteService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'phone_number',
    'laterality',
    'disability_type',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);
  allAthletes: any[] = [];
  selectedSubProgram: string = '';
   ModalContactComponent= ModalContactComponent;

  ngOnInit() {
    this.loadAthletes();
  }

  loadAthletes() {
    this.athleteService.getAll().subscribe({
      next: (data) => {
        this.allAthletes = data.map((athlete: any) => ({
          ...athlete,
          name: athlete.name,
          age: this.calculateAge(athlete.birthdate || athlete.person?.birth_date)
        }));
        this.dataSource.data = [...this.allAthletes];
      },
      error: (err) => console.error('Error cargando atletas:', err),
    });
  }

  calculateAge(birthdate: Date | string): number {
    if (!birthdate) return 0;
    const birth = new Date(birthdate);
    if (isNaN(birth.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  filterBySubProgram() {
    if (this.selectedSubProgram) {
      this.dataSource.data = this.allAthletes.filter(a => a.subProgram === this.selectedSubProgram);
    } else {
      this.dataSource.data = [...this.allAthletes];
    }
  }

  openContactDialog(athlete: any) {
    this.dialog.open(this.ModalContactComponent, {
      width: '400px',
      data: { athlete }
    });
  }

  editAthlete(athlete: any) {
    console.log('Editar atleta', athlete);
    // Aquí podrías abrir tu AthleteEditDialogComponent
  }

  deleteAthlete(id: number) {
    this.athleteService.delete(id).subscribe({
      next: () => {
        this.allAthletes = this.allAthletes.filter((athlete) => athlete.id !== id);
        this.filterBySubProgram();
      },
      error: (err) => console.error('Error eliminando atleta:', err),
    });
  }
}
