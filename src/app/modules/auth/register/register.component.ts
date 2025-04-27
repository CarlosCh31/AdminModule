import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../../core/auth.service';
import { NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { EmailService } from "../../../core/email-service.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatIcon
  ],
  standalone: true,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private router = inject(Router);

  isLoading = false;
  formStatus: string = '';
  allowExternalDomain = false;
  showDomainWarning = false;
  submitted = false;

  /**
   * Navega a la página de login
   */
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Valida si el correo pertenece al dominio `@olimpiadasespeciales.cr`
   */
  private emailDomainValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!this.submitted) return null; // Solo validar dominio después de enviar

    const email: string = control.value;
    if (!email) return null;

    const validDomain = email.endsWith('@olimpiadasespeciales.cr');
    if (!validDomain && !this.allowExternalDomain) {
      return { invalidDomain: true };
    }
    return null;
  };

  /**
   * Formulario (solo el correo, la contraseña se genera automáticamente)
   */
  registerForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email, this.emailDomainValidator]]
  });

  /**
   * Verifica si un campo es inválido y ha sido tocado
   */
  isInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  /**
   * Marca un campo como tocado manualmente
   */
  markTouched(field: string) {
    this.registerForm.get(field)?.markAsTouched();
  }

  /**
   * Genera una contraseña aleatoria
   */
  private generatePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
    return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  /**
   * Envía el formulario
   */
  onSubmit() {
    this.submitted = true;
    this.showDomainWarning = false;

    if (this.registerForm.invalid) {
      this.formStatus = 'Corrige los errores antes de continuar.';
      return;
    }

    const email = this.registerForm.value.email;
    const isInternalDomain = email.endsWith('@olimpiadasespeciales.cr');

    if (!isInternalDomain && !this.allowExternalDomain) {
      this.showDomainWarning = true;
      this.formStatus = 'Verifica el dominio del correo electrónico';
      return; // Detiene el proceso hasta que el usuario decida continuar
    }

    this.isLoading = true;
    this.formStatus = 'Registrando...';

    const generatedPassword = this.generatePassword();
    const userData = { email, password: generatedPassword };

    this.authService.register(userData)
      .subscribe({
        next: () => {
          this.formStatus = '✅ Registro exitoso. Se ha enviado un correo con tu contraseña.';
          this.sendEmailNotification(email, generatedPassword);
          this.registerForm.reset();
          this.isLoading = false;
          this.allowExternalDomain = false;
          this.submitted = false;
        },
        error: (err) => {
          this.formStatus = `❌ Error en el registro: ${err.message || 'correo ya inscrito'}`;
          this.isLoading = false;

          setTimeout(() => {
            this.formStatus = '';
            this.registerForm.reset();
            this.allowExternalDomain = false;
            this.submitted = false;
          }, 2000);
        }
      });
  }

  /**
   * Simula el envío de correo con la contraseña
   */
  private sendEmailNotification(email: string, password: string) {
    this.emailService.sendWelcomeEmail(email, password).subscribe({
      next: () => console.log(`📧 Correo enviado a: ${email}`),
      error: (err) => console.error('Error al enviar el correo:', err)
    });
  }
}
