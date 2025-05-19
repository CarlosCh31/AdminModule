import { Component, OnInit, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/auth.service';
import { AdminEditDialogComponent } from '../admin-edit-dialog/admin-edit-dialog.component';
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

@Component({
  selector: 'app-admin-list',
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
    NgIf
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  readonly itemsPerPage = 6;
  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];

  displayedColumns: string[] = ['id', 'email', 'password', 'actions'];
  admins: any[] = [];
  sortedData: any[] = [];
  showPasswords: { [key: number]: boolean } = {};

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    const adminsObservable: Observable<any[]> = this.authService.getAll();
    adminsObservable.subscribe({
      next: (data) => {
        this.admins = data;
        this.sortedData = [...this.admins];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error cargando administradores:', err);
      },
    });
  }

  togglePasswordVisibility(id: number) {
    this.showPasswords[id] = !this.showPasswords[id];
  }

  sortBy(property: string, direction: 'asc' | 'desc') {
    this.sortedData = [...this.admins].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updateAdmin(admin: any) {
    const dialogRef = this.dialog.open(AdminEditDialogComponent, {
      width: '400px',
      data: { ...admin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAdmins();
      }
    });
  }

  deleteAdmin(admin: any) {
    this.authService.deleteAdmin(admin).subscribe(() => {
      this.admins = this.admins.filter((a) => a.email !== admin.email);
      this.loadAdmins();
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
