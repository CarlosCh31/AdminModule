import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ActivityService } from '../../../core/activity.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activity-edit-dialog',
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
  templateUrl: './activity-edit-dialog.component.html',
  styleUrls: ['./activity-edit-dialog.component.scss'],
})
export class ActivityEditDialogComponent {
  public editForm: FormGroup;  // Cambiado a público para acceder desde el HTML
  private activityService = inject(ActivityService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ActivityEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      name: [data.name, [Validators.required]],
      description: [data.description, [Validators.required]],
      date: [data.date, [Validators.required]],
      time: [data.time, [Validators.required]],
      duration: [data.duration, [Validators.required, Validators.min(1)]],
      modality: [data.modality, [Validators.required]],
      location: [data.location, [Validators.required]],
      max_participants: [data.max_participants, [Validators.required, Validators.min(1)]],
      state: [data.state, [Validators.required]]
    });
  }

  // Hacer los getters públicos para que sean accesibles en la plantilla
  public get nameControl() {
    return this.editForm.get('name');
  }

  public get descriptionControl() {
    return this.editForm.get('description');
  }

  public get dateControl() {
    return this.editForm.get('date');
  }

  public get timeControl() {
    return this.editForm.get('time');
  }

  public get durationControl() {
    return this.editForm.get('duration');
  }

  public get modalityControl() {
    return this.editForm.get('modality');
  }

  public get locationControl() {
    return this.editForm.get('location');
  }

  public get maxParticipantsControl() {
    return this.editForm.get('max_participants');
  }

  public get stateControl() {
    return this.editForm.get('state');
  }

  public saveChanges() {
    if (this.editForm.valid) {
      const activityData = this.editForm.value;

      this.activityService.update(activityData).subscribe(
        (response) => {
          console.log('Actividad actualizada:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al actualizar actividad:', error);
          window.location.reload();
          this.dialogRef.close(true);
        }
      );
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
