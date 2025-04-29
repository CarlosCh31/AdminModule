import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-coordinator-profile',
  templateUrl: './coordinator-profile.component.html',
  styleUrls: ['./coordinator-profile.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ]
})
export class CoordinatorProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  loading = true;
  protected userService = inject(UserService);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // SIEMPRE creamos el form
    this.profileForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Luego traemos usuario
    this.userData = this.authService.getCurrentUser();

    if (!this.userData) {
      console.warn('No se encontró usuario autenticado');
      // puedes mostrar un mensaje o redirigir
      setTimeout(() => {
        this.userService.setUser("Iniciacion");  // o donde prefieras
      }, 2000);
    }

    this.loading = false;
  }

  save() {
    if (this.profileForm.invalid || !this.userData) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const newPassword = this.profileForm.value.password;
    const updateData = {
      id: this.userData.email,
      password: newPassword
    };

    this.authService.edit(updateData).subscribe({
      next: () => {
        alert('Contraseña actualizada exitosamente');
        this.userService.setUser("Iniciacion");
      },
      error: (err) => {
        console.error('Error actualizando', err);
        alert('Ocurrió un error al actualizar la contraseña.');
      }
    });
  }

  cancel() {
    this.userService.setUser("Iniciacion");
  }
}
