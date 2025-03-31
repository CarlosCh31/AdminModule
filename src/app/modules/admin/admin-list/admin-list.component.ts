import { Component, OnInit, inject } from '@angular/core';
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
  MatTable,
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/auth.service';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AdminEditDialogComponent} from '../admin-edit-dialog/admin-edit-dialog.component';
import {Router} from '@angular/router';
import {UserService} from '../../../core/user.service';

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
    NgIf,
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private variable = inject(UserService);

  displayedColumns: string[] = ['id', 'email', 'password', 'actions'];
  admins: any[] = [];
  showPasswords: { [key: number]: boolean } = {};

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    const adminsObservable: Observable<any[]> = this.authService.getAll();
    adminsObservable.subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (err) => {
        console.error('Error cargando administradores:', err);
      },
    });
  }

  togglePasswordVisibility(id: number) {
    this.showPasswords[id] = !this.showPasswords[id];
  }

  updateAdmin(admin: any) {
    const dialogRef = this.dialog.open(AdminEditDialogComponent, {
      width: '400px',
      data: { ...admin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.admins.findIndex((a) => a.id === admin.id);
        if (index !== -1) {
          this.admins[index] = { ...this.admins[index], ...result };
        }
      }
      this.reloadComponent()
    });
  }
  reloadComponent() {
    this.router.navigateByUrl('admin-list', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.router.url]).then(r => this.variable.setUser('usuarios')); // Recarga la ruta actual
    });
  }
  deleteAdmin(admin: any) {
    console.log(`Eliminar admin con correo: ${admin.email}`);

    this.authService.deleteAdmin(admin).subscribe(() => {
      this.admins = this.admins.filter((a) => a.email !== admin.email);
    });
  }
}
