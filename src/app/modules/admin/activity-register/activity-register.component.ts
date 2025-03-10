import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {AuthService} from '../../../core/auth.service';
import {ActivityService} from '../../../core/activity.service';

@Component({
  selector: 'app-activity-register',
    imports: [
        ReactiveFormsModule,
        NgForOf,
        MatIcon
    ],
  templateUrl: './activity-register.component.html',
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
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: [0, Validators.required],
      modality: ['', Validators.required],
      location: ['', Validators.required],
      max_participants: [0, [Validators.required, Validators.min(1)]],
      minimum_age: [0, Validators.required],
      maximum_age: [0, Validators.required],
      admin: ['', [Validators.required, Validators.email]],
    });
  }

  submitActivity(): void {
    if (this.activityForm.valid) {
      this.activityForm.value.admin = localStorage.getItem('authUser');
      const activityData = this.activityForm.value;

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
