import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
// hay que cambiarlo por seguridad
  private pageStrategies: Record<string, () => void> = {
    'admin@example.com': () => this.router.navigate(['admin/users']),
    'info@olimpiadasespeciales.cr': () => this.router.navigate(['admin/users']),
    'psalazar@olimpiadasespeciales.cr': () => this.router.navigate(['coordinator/index']),
  };

  private pageAssigner() {
    const email = this.loginForm.controls['email'].value ?? ''; // Asegura que no sea null
    const navigateTo = this.pageStrategies[email];

    if (navigateTo) {
      navigateTo();
    } else {
      console.log('Correo no reconocido, redirigiendo a página de inicio');
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    console.log('Valores del form', this.loginForm.value.email);

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as { email: string; password: string })
        .subscribe({
          next: () => this.pageAssigner(),
          error: (err) => console.log('Error en login:', err)
        });
    }
    console.log('LogInValue', this.authService.isLoggedIn());
  }

}
