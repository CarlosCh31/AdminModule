import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/register', loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./modules/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'admin/users', loadComponent: () => import('./modules/admin/users/users.component').then(m => m.UsersComponent) },
  { path: 'coordinator/dashboard', loadComponent: () => import('./modules/coordinator/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'coordinator/volunteers', loadComponent: () => import('./modules/coordinator/volunteers/volunteers.component').then(m => m.VolunteersComponent) },
  { path: 'coordinator/events', loadComponent: () => import('./modules/coordinator/events/events.component').then(m => m.EventsComponent) },
  { path: 'athlete-manager/dashboard', loadComponent: () => import('./modules/athlete-manager/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'athlete-manager/athletes', loadComponent: () => import('./modules/athlete-manager/athletes/athletes.component').then(m => m.AthletesComponent) },
  { path: 'athlete-manager/waitlist', loadComponent: () => import('./modules/athlete-manager/waitlist/waitlist.component').then(m => m.WaitlistComponent) },
  { path: 'admin-list', loadComponent: () => import('./modules/admin/admin-list/admin-list.component').then(m => m.AdminListComponent) }

];
