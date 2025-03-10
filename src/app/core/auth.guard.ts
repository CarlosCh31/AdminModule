import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const authService = inject(AuthService);
const router = inject(Router);

export const authGuard = () => {
  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
