import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../core/activity.service';
import { AthleteService } from '../../core/athlete.service';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-results-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './results-register.component.html',
  styleUrls: ['./results-register.component.scss']
})
export class ResultsRegisterComponent implements OnInit {
  form!: FormGroup;
  activities: any[] = [];
  athletes: any[] = [];

  private activityService = inject(ActivityService);
  private athleteService = inject(AthleteService);
  private http = inject(HttpClient);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      activityId: ['', Validators.required],
      athleteId: ['', Validators.required],
      position: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.activityService.getAll().subscribe(data => this.activities = data);
  }

  onActivitySelect(activityId: number) {
    this.http.get<any[]>(`http://localhost:8080/api/activities/${activityId}/athletes`)
      .subscribe(data => this.athletes = data);
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;
    this.http.post('http://localhost:8080/api/results/register', data).subscribe({
      next: () => alert('Resultado guardado correctamente.'),
      error: err => alert('Error al guardar resultado.')
    });
  }
}
