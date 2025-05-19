import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForOf, CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { AuthService } from '../../../core/auth.service';
import { ActivityService } from '../../../core/activity.service';

export interface Administrator {
  id?: number;
  email: string;
  password: string;
  type: number;
}

export interface Activity {
  id?: number;
  type: string;
  name: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  modality: string;
  location: string;
  maxParticipants: number;
  minimumAge: number;
  maximumAge: number;
  administrator: Administrator;
  sport?: string;
}

export interface Sport {
  id: number;
  type: string;
  difficulty: string;
  needs_special_equipment: boolean;
  specifications: string;
  level: string;
}

export interface Workshop {
  id: number;
  objective: string;
  target_audience: string;
  needs_material: boolean;
  specifications: string;
}

export interface TalkForum {
  id: number;
  theme: string;
  target_audience: string;
}

@Component({
  selector: 'app-activity-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgForOf,
    MatIcon
  ],
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.scss'],
})
export class ActivityRegisterComponent implements OnInit {
  @Output() activityAdded = new EventEmitter<void>();
  activityForm!: FormGroup;
  showMainForm = true;
  showAdditionalForm = false;
  submittedMain = false;
  submittedAdditional = false;
  activityTypes = ['Deporte', 'Taller', 'Charla', 'Foro'];
  sports = ['Fútbol', 'Baloncesto', 'Natación', 'Atletismo'];
  private activityService = inject(ActivityService);
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['00:00', Validators.required],
      duration: ['', Validators.required],
      modality: ['', Validators.required],
      location: ['', Validators.required],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      minimumAge: ['', Validators.required],
      maximumAge: ['', Validators.required],

      sport: [''],
      difficulty: [''],
      needs_special_equipment: [false],
      level: [''],
      objective: [''],
      target_audience: [''],
      needs_material: [false],
      specifications: [''],
      theme: ['']
    });

    this.activityForm.get('type')?.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });
  }

  private updateValidators(activityType: string) {
    const fieldGroups: Record<string, string[]> = {
      Deporte: ['sport', 'difficulty', 'needs_special_equipment', 'specifications', 'level'],
      Taller: ['objective', 'target_audience', 'needs_material', 'specifications'],
      Charla: ['theme', 'target_audience'],
      Foro: ['theme', 'target_audience']
    };

    Object.values(fieldGroups).flat().forEach(field =>
      this.activityForm.get(field)?.clearValidators()
    );

    if (this.showAdditionalForm && fieldGroups[activityType]) {
      fieldGroups[activityType].forEach(field =>
        this.activityForm.get(field)?.setValidators([Validators.required])
      );
    }
    this.activityForm.updateValueAndValidity();
  }

  goToNextStep() {
    this.submittedMain = true;
    const firstPartFields = ['type', 'name', 'description', 'date', 'time', 'duration', 'modality', 'location', 'maxParticipants', 'minimumAge', 'maximumAge'];

    firstPartFields.forEach(field => {
      this.activityForm.get(field)?.markAsTouched();
    });

    if (firstPartFields.every(field => this.activityForm.get(field)?.valid)) {
      this.showMainForm = false;
      this.showAdditionalForm = true;
      this.submittedMain = false;
    }
  }

  goBack() {
    this.showMainForm = true;
    this.showAdditionalForm = false;
  }

  onSpecialEquipmentChange(event: any) {
    this.activityForm.patchValue({ needs_special_equipment: event.target.value === 'true' });
  }

  onSpecialMaterialChange(event: any) {
    this.activityForm.patchValue({ needs_material: event.target.value === 'true' });
  }

  submitActivity(): void {
    this.submittedAdditional = true;
    this.updateValidators(this.activityForm.get('type')?.value);

    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }

    let activityData = {
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
      administrator: { id: 0, email: this.activityForm.value.email, password: '' },
      state: 'activo'
    };

    const handleSuccess = (response: any) => {
      console.log('Actividad creada:', response.message);
      this.successMessage = response.message || '¡Actividad guardada correctamente!';
      this.errorMessage = null;
      this.activityForm.reset();
      this.goBack();
      this.activityAdded.emit();
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    };

    const handleError = (error: any) => {
      console.error('Error al registrar la actividad:', error);
      this.errorMessage = error?.error?.message || 'Ocurrió un error al registrar la actividad.';
      this.successMessage = null;
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    };

    switch (this.activityForm.value.type) {
      case 'Deporte':
        Object.assign(activityData, {
          sport: this.activityForm.value.sport,
          difficulty: this.activityForm.value.difficulty,
          needs_special_equipment: this.activityForm.value.needs_special_equipment,
          specifications: this.activityForm.value.specifications,
          level: this.activityForm.value.level
        });
        this.activityService.registerSport(activityData).subscribe(handleSuccess, handleError);
        break;

      case 'Taller':
        Object.assign(activityData, {
          objectives: this.activityForm.value.objective,
          target_audience: this.activityForm.value.target_audience,
          needs_material: this.activityForm.value.needs_material,
          specifications: this.activityForm.value.specifications,
        });
        this.activityService.registerWorkshop(activityData).subscribe(handleSuccess, handleError);
        break;

      case 'Charla':
      case 'Foro':
        Object.assign(activityData, {
          theme: this.activityForm.value.theme,
          target_audience: this.activityForm.value.target_audience
        });
        this.activityService.registerTalkForum(activityData).subscribe(handleSuccess, handleError);
        break;
    }
  }
}
