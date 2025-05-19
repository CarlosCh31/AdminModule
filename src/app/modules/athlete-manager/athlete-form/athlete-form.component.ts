import {Component, EventEmitter, Output, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { LocationService } from '../../../core/location.service';
import {AthleteService} from '../../../core/athlete.service';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-athlete-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    NgFor,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.scss']
})
export class AthleteFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<any>();
  @Output() cancelForm = new EventEmitter<void>();

  form!: FormGroup;

  provinces: any[] = [];
  cantons: any[] = [];
  cantonsDisponibles: any[] = [];
  regions: any[] = [];
  cantonsLoaded = false;
  private athleteService = inject(AthleteService);

  constructor(private fb: FormBuilder, private locationService: LocationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      tipo: ['', Validators.required],
      citizenship: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      province_id: ['', Validators.required],
      canton_id: ['', Validators.required],
      laterality: ['', Validators.required],
      disability_type: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      sub_program: ['', Validators.required],
      state: ['Activo'],
      canton_name: ['', Validators.required],
      province_name: ['', Validators.required]
    });

    this.loadLocations();
  }

  loadLocations() {
    this.locationService.getProvinces().subscribe({
      next: (data) => this.provinces = data,
      error: (err) => console.error('Error cargando provincias', err)
    });

    this.locationService.getCantons().subscribe({
      next: (data) => {
        this.cantons = data;
        this.cantonsLoaded = true;
      },
      error: (err) => console.error('Error cargando cantones', err)
    });

    this.locationService.getRegions().subscribe({
      next: (data) => this.regions = data,
      error: (err) => console.error('Error cargando regiones', err)
    });
  }

  onProvinceChange(event: MatSelectChange) {
    const provinceId = event.value;
    const selectedProvince = this.provinces.find(p => p.id === provinceId);

    if (this.cantonsLoaded) {
      this.cantonsDisponibles = this.cantons.filter(c => c.provinceId == provinceId);
      this.form.patchValue({ canton_id: '' });
    }

    if (selectedProvince) {
      this.form.patchValue({
        province_name: selectedProvince.name
      });
    }
  }
  onCantonChange() {
    const cantonId = this.form.get('canton_id')?.value;
    const selectedCanton = this.cantonsDisponibles.find(c => c.id === cantonId);

    if (selectedCanton) {
      this.form.patchValue({
        canton_name: selectedCanton.name
      });
    }
  }

  getRegionName(): string {
    const cantonId = this.form.get('canton_id')?.value;
    if (!cantonId) {
      return 'Seleccione un cantón';
    }
    const canton = this.cantons.find(c => c.id === cantonId);
    const region = this.regions.find(r => r.id === canton?.region_id);
    return region ? region.name : 'Región desconocida';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.form.value.name || this.form.value.name.trim() === '') {
      console.error('Nombre es requerido');
      return;
    }

    const formData = this.form.value;

    const athleteData = {
      laterality: formData.laterality,
      disability_type: formData.disability_type,
      weight: formData.weight,
      height: formData.height,
      subProgram: formData.sub_program,
      state: formData.state || 'Activo',
      id: formData.id,
      name: formData.name,
      birthdate: formData.birthdate,
      email: formData.email,
      phone_number: formData.phone_number,
      citizenship: formData.citizenship,
      tipo: 'Atleta',
      province_id: {
        id: Number(formData.province_id),
        name: formData.province_name
      },
      canton_id: {
        id: Number(formData.canton_id),
        name: formData.canton_name,
        province: Number(formData.province_id)
      }
    };



    this.athleteService.saveAthlete(athleteData).subscribe({

      next: (savedAthlete) => {
        console.log('Atleta guardado en backend:', savedAthlete);
        this.submitForm.emit(savedAthlete);
      },
      error: (err) => {
        console.log("Information: ",athleteData);
        console.error('Error guardando atleta:', err);
      }
    });
  }

  cancel() {
    this.cancelForm.emit();
  }
}
