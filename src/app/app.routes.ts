import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./modules/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'admin/users', loadComponent: () => import('./modules/admin/users/users.component').then(m => m.UsersComponent) },
  { path: 'athlete-manager/waitlist', loadComponent: () => import('./modules/athlete-manager/waitlist/waitlist.component').then(m => m.WaitlistComponent) },
  { path: 'admin-list', loadComponent: () => import('./modules/admin/admin-list/admin-list.component').then(m => m.AdminListComponent) },
  { path: 'shared/register-results', loadComponent: () => import('./shared/results-register/results-register.component').then(m => m.ResultsRegisterComponent) },
  { path: 'coordinator/index', loadComponent: () => import('./modules/athlete-manager/index-coordinator/index-coordinator.component').then(m => m.IndexCoordinatorComponent) }
];
