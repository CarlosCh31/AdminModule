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
import {MatOption, MatSelect} from '@angular/material/select';

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
    ReactiveFormsModule,
    MatSelect,
    MatOption
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
      id: [data.id],
      name: [data.name, [Validators.required]],
      type: [data.type, [Validators.required]],
      description: [data.description, [Validators.required]],
      date: [data.date, [Validators.required]],
      time: [data.time, [Validators.required]],
      duration: [data.duration, [Validators.required, Validators.min(1)]],
      modality: [data.modality, [Validators.required]],
      location: [data.location, [Validators.required]],
      maxParticipants: [data.maxParticipants, [Validators.required, Validators.min(1)]],
      minimumAge: [data.minimumAge, [Validators.required]],
      maximumAge: [data.maximumAge, [Validators.required]],
      administratorEmail: [data.administratorEmail, [Validators.required]],
      state: [data.state, [Validators.required]]
    });
  }

  get idControl() {
    return this.editForm.get('id');
  }
  // Hacer los getters públicos para que sean accesibles en la plantilla
  get nameControl() {
    return this.editForm.get('name');
  }

  get typeControl() {
    return this.editForm.get('type');
  }

  get descriptionControl() {
    return this.editForm.get('description');
  }

  get dateControl() {
    return this.editForm.get('date');
  }

  get timeControl() {
    return this.editForm.get('time');
  }

  get durationControl() {
    return this.editForm.get('duration');
  }

  get modalityControl() {
    return this.editForm.get('modality');
  }

  get locationControl() {
    return this.editForm.get('location');
  }

  get maxParticipantsControl() {
    return this.editForm.get('maxParticipants');
  }

  get minimumAgeControl(){
    return this.editForm.get('minimumAge');
  }

  get maximumAgeControl(){
    return this.editForm.get('maximumAge');
  }

  get administratorEmailControl(){
    return this.editForm.get('administratorEmail');
  }

  get stateControl() {
    return this.editForm.get('state');
  }

  public saveChanges() {
    if (this.editForm.valid) {
      const activityData = this.editForm.value;
      console.log(activityData);

      this.activityService.update(activityData).subscribe(
        (response) => {
          console.log('Actividad actualizada:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al actualizar actividad:', error);
          this.dialogRef.close(true);
        }
      );
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
