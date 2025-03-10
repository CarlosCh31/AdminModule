import {Component, inject, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import {AuthService} from '../../../core/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './admin-edit-dialog.component.html',
  styleUrls: ['./admin-edit-dialog.component.scss'],
})
export class AdminEditDialogComponent {
  editForm: FormGroup;
  private authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AdminEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl() {
    return this.editForm.get('email');
  }

  get passwordControl() {
    return this.editForm.get('password');
  }

  saveChanges() {
    if (this.editForm.valid) {
      const adminData = this.editForm.value;

      this.authService.edit(adminData).subscribe(
        (response) => {
          console.log('Admin actualizado:', response);
          this.dialogRef.close(true); // Cierra el modal y actualiza la vista
        },
        (error) => {
          window.location.reload();
          this.dialogRef.close(true);
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
