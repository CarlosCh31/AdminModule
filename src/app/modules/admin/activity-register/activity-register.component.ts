import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {AuthService} from '../../../core/auth.service';
import {ActivityService} from '../../../core/activity.service';

export interface Administrator {
  id?: number,
  email: string,
  password: string,
  type: number
}

export interface Activity {
  id?: number,
  type: string,
  name: string,
  description: string,
  date: string,
  time: string,
  duration: string,
  modality: string,
  location: string,
  maxParticipants: number,
  minimumAge: number,
  maximumAge: number,
  administrator: Administrator
}



@Component({
  selector: 'app-activity-register',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatIcon
  ],
  templateUrl: './activity-register.component.html',
  standalone: true,
  styleUrl: './activity-register.component.scss'
})
export class ActivityRegisterComponent implements OnInit {
  activityForm!: FormGroup;
  activityTypes = ['Actividad deportiva', 'Taller', 'Charla', 'Foro'];
  private activityService = inject(ActivityService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      type: ['taller', Validators.required],
      name: ['Amanda', [Validators.required, Validators.maxLength(255)]],
      description: ['descripsion', Validators.required],
      date: ['2025-03-13', Validators.required],
      time: ['18:00:00', Validators.required],
      duration: ['02:00:00', Validators.required],
      modality: ['virtual', Validators.required],
      location: ['aqui', Validators.required],
      maxParticipants: [40, [Validators.required, Validators.min(1)]],
      minimumAge: [10, Validators.required],
      maximumAge: [15, Validators.required],
      email: ['admin@example.com']
    });
  }

  submitActivity(): void {
    if (this.activityForm.valid) {
        const activityData: Activity = {
          id: 0,
          type: this.activityForm.value.type,
          name: this.activityForm.value.name,
          description: this.activityForm.value.description,
          date: this.activityForm.value.date,
          time: this.activityForm.value.time,
          duration: this.activityForm.value.duration,
          modality: this.activityForm.value.modality,
          location: this.activityForm.value.location,
          maxParticipants: this.activityForm.value.maxParticipants,
          minimumAge: this.activityForm.value.minimumAge,
          maximumAge: this.activityForm.value.maximumAge,
          administrator: {
            id: 0,
            email: this.activityForm.value.email,
            password: '',
            type : 0
          }
        }

      console.log (JSON.stringify(activityData));
      this.activityService.register(activityData).subscribe(
        (response) => {
          console.log('Actividad actualizada:', response);

        },
        (error) => {
          console.error('Error al actualizar actividad:', error);

        }
      );
    }
  }
}
