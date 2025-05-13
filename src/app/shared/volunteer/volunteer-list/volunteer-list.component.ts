import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerService } from '../../../core/volunteer.service';
import { VolunteerEditDialogComponent } from '../volunteer-edit-dialog/volunteer-edit-dialog.component';
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
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-volunteer-list',
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
    MatMenuModule
  ],
  templateUrl: './volunteer-list.component.html',
  styleUrl: './volunteer-list.component.scss',
})
export class VolunteerListComponent implements OnInit {
  private volunteerService = inject(VolunteerService);
  private dialog = inject(MatDialog);

  // Configuración de paginación
  readonly itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'phone_number', 'sportExperience', 'actions'];
  volunteers: any[] = [];
  sortedData: any[] = [];

  ngOnInit() {
    this.loadVolunteers();
  }

  loadVolunteers() {
    this.volunteerService.getAll().subscribe({
      next: (data: any[]) => {
        this.volunteers = data;
        this.sortedData = [...this.volunteers];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error cargando voluntarios:', err);
      },
    });
  }

  sortByName(direction: 'asc' | 'desc') {
    this.sortedData = [...this.volunteers].sort((a, b) => {
      const nameA = (a.name || '').toString().toLowerCase();
      const nameB = (b.name || '').toString().toLowerCase();

      if (nameA < nameB) return direction === 'asc' ? -1 : 1;
      if (nameA > nameB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  sortByExperience(direction: 'asc' | 'desc') {
    this.sortedData = [...this.volunteers].sort((a, b) => {
      const expA = a.sportExperience || '';
      const expB = b.sportExperience || '';

      if (direction === 'asc') {
        return expA.localeCompare(expB);
      }
      return expB.localeCompare(expA);
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  editVolunteer(volunteer: any) {
    const dialogRef = this.dialog.open(VolunteerEditDialogComponent, {
      width: '400px',
      data: { ...volunteer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVolunteers();
      }
    });
  }

  deleteVolunteer(volunteer: any) {
    this.volunteerService.delete(volunteer).subscribe({
      next: () => {
        this.volunteers = this.volunteers.filter((v) => v.id !== volunteer.id);
        this.loadVolunteers();
      },
      error: (err) => {
        console.error('Error eliminando voluntario:', err);
      },
    });
  }

  // Métodos de paginación
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
