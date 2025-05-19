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
    this.athleteService.getAll().subscribe(data => this.athletes = data);
  }

  onActivitySelect(activityId: number) {

  }

  submit() {
    if (this.form.invalid) return;

    const formData = this.form.value;

    const payload = {
      activity: formData.activityId ,
      athlete:  formData.athleteId ,
      position: formData.position,
      time: formData.time
    };
    this.http.post('http://localhost:8080/api/results/register', payload, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response);
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Error de integridad: ' + error.error);
        } else if (error.status === 500) {
          alert('Error del servidor: ' + error.error);
        } else {
          alert('Error desconocido: ' + error.error);
        }
      }
    });
  }


}
