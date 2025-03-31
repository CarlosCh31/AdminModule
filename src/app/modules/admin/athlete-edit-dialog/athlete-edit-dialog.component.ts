import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatOption, MatSelect} from '@angular/material/select';
import {AthleteService} from '../../../core/athlete.service';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-athlete-edit-dialog',
  templateUrl: './athlete-edit-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgIf,
    MatError,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent
  ],
  styleUrl: './athlete-edit-dialog.component.scss'
})
export class AthleteEditDialogComponent {
  editForm: FormGroup;
  private athleteService = inject(AthleteService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AthleteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [this.data?.id || '', [Validators.required]],
      laterality: [this.data?.laterality || '', [Validators.required]],
      disability_type: [this.data?.disability_type || '', [Validators.required]],
      weight: [this.data?.weight || '', [Validators.required, Validators.min(1)]],
      height: [this.data?.height || '', [Validators.required, Validators.min(1)]],
    });
  }

  get idControl() {
    return this.editForm.get('id');
  }

  get lateralityControl() {
    return this.editForm.get('laterality');
  }

  get disabilityControl() {
    return this.editForm.get('disability_type');
  }

  get weightControl() {
    return this.editForm.get('weight');
  }

  get heightControl() {
    return this.editForm.get('height');
  }

  saveChanges() {
    if (this.editForm.valid) {
      const athleteData = this.editForm.value;

      this.athleteService.update(athleteData).subscribe(
        (response) => {
          console.log('athlete actualizado:', response);
          this.dialogRef.close();
        },
        (error) => {
          this.dialogRef.close();
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
