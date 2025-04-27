import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { VolunteerService } from '../../../core/volunteer.service';

@Component({
  selector: 'app-volunteer-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './volunteer-edit-dialog.component.html',
  styleUrls: ['./volunteer-edit-dialog.component.scss']
})
export class VolunteerEditDialogComponent {
  public editForm: FormGroup;
  private volunteerService = inject(VolunteerService);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VolunteerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [data.id, Validators.required],
      sportExperience: [data.sportExperience],
    });
  }

  public saveChanges() {
    if (this.editForm.valid) {
      const updatedVolunteer = this.editForm.value;

      this.volunteerService.update(updatedVolunteer).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error('Error actualizando voluntario:', err);
          this.dialogRef.close(true); // opcional: cerrar siempre
        }
      });
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
