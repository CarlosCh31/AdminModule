import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AthleteService} from '../../../core/athlete.service';
import {HttpClient} from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule, NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-programas-edit-dialog',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatDialogActions,
    MatButton,
    CommonModule,
    MatOption,
    MatError
  ],
  templateUrl: './programas-edit-dialog.component.html',
  standalone: true,
  styleUrl: './programas-edit-dialog.component.scss'
})
export class ProgramasEditDialogComponent {
  editForm: FormGroup;
  private athleteService = inject(AthleteService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ProgramasEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [this.data?.id || '', [Validators.required]],
      name: [this.data?.name || '', [Validators.required]],
      phone_number: [this.data?.phone_number || '', [Validators.required]],
      laterality: [this.data?.laterality || '', [Validators.required]],
      disability_type: [this.data?.disability_type || '', [Validators.required]],
      state: [this.data?.state || '', [Validators.required]]
    });

  }

  get idControl() {
    return this.editForm.get('id');
  }

  get nameControl() {
    return this.editForm.get('name');
  }

  get phone_numberControl() {
    return this.editForm.get('phone_number');
  }

  get lateralityControl() {
    return this.editForm.get('laterality');
  }

  get disabilityControl() {
    return this.editForm.get('disability_type');
  }

  get stateControl() {
    return this.editForm.get('state');
  }

  saveChanges() {
    if (this.editForm.valid) {
      const athleteData = this.editForm.value;
      console.log(athleteData);

      this.athleteService.updateManager(athleteData).subscribe(
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
