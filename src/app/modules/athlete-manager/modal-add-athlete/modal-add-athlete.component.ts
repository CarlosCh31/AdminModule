import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AthleteFormComponent } from '../athlete-form/athlete-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'; // 🚨 AGREGAR ESTO

@Component({
  selector: 'app-modal-add-athlete',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    AthleteFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <app-athlete-form (submitForm)="save($event)" (cancelForm)="cancel()"></app-athlete-form>
  `
})
export class ModalAddAthleteComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalAddAthleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(formData: any) {
    this.dialogRef.close(formData);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
