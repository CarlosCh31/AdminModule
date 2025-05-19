import { Component, inject, OnInit } from '@angular/core';
import { AthleteService } from '../../../core/athlete.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {ModalContactComponent} from '../modal-contact/modal-contact.component';
import {AdminEditDialogComponent} from '../../admin/admin-edit-dialog/admin-edit-dialog.component';
import {ProgramasEditDialogComponent} from '../programas-edit-dialog/programas-edit-dialog.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {ModalAddAthleteComponent} from '../modal-add-athlete/modal-add-athlete.component';

@Component({
  selector: 'app-admin-program',
  standalone: true,
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
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
    MatRowDef,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSortModule
  ],
})
export class ProgramasComponent implements OnInit {

  private athleteService = inject(AthleteService);
  private dialog = inject(MatDialog);

  readonly itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'phone_number',
    'laterality',
    'disability_type',
    'actions'
  ];

  allAthletes: any[] = [];
  sortedData: any[] = [];
  selectedSubProgram: string = '';
  selectedState: string = '';
  ModalContactComponent= ModalContactComponent;
  ModalAddAthleteComponent = ModalAddAthleteComponent;


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
        this.sortedData = [...this.allAthletes];
        this.updatePagination();
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
      this.sortedData = this.allAthletes.filter(a => a.subProgram === this.selectedSubProgram);
    } else {
      this.sortedData = [...this.allAthletes];
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  sortByName(direction: 'asc' | 'desc') {
    this.sortedData = [...this.sortedData].sort((a, b) => {
      const nameA = (a.name || '').toString().toLowerCase();
      const nameB = (b.name || '').toString().toLowerCase();

      if (nameA < nameB) return direction === 'asc' ? -1 : 1;
      if (nameA > nameB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  sortByAge(direction: 'asc' | 'desc') {
    this.sortedData = [...this.sortedData].sort((a, b) => {
      if (direction === 'asc') {
        return a.age - b.age;
      }
      return b.age - a.age;
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  openContactDialog(athlete: any) {
    this.dialog.open(this.ModalContactComponent, {
      width: '400px',
      data: { athlete }
    });
  }

  openAddDialog() {
    console.log('Abriendo modal de agregar atleta');
    const dialogRef = this.dialog.open(this.ModalAddAthleteComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nuevo atleta:', result);
      }

    });
  }

  editAthlete(athlete: any) {
    const dialogRef = this.dialog.open(ProgramasEditDialogComponent, {
      width: '400px',
      data: { ...athlete },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAthletes();
      if (result) {
        const index = this.allAthletes.findIndex((a) => a.id === athlete.id);
        if (index !== -1) {
          this.allAthletes[index] = { ...this.allAthletes[index], ...result };
        }
      }
    });
  }

  addAthlete(){
    console.log("Temp");
  }

  deleteAthlete(id: number) {
    this.athleteService.delete(id).subscribe({
      next: () => {
        this.allAthletes = this.allAthletes.filter((athlete) => athlete.id !== id);
      },
      error: (err) => console.error('Error eliminando atleta:', err),
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
