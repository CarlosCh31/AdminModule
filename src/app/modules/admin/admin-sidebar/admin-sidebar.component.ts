import {Component, inject} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

import { NgForOf } from '@angular/common';

import {UserService} from '../../../core/user.service';


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    NgForOf,
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  private userService = inject(UserService);

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { label: 'Administrar Coordinadores', icon: 'group', route: 'usuarios' },
    { label: 'Crear nuevo usuario', icon: 'person_add', route: 'register' },
    { label: 'Lista de atletas', icon: 'sports', route: 'atletas' },
    { label: 'Crear nuevo evento', icon: 'event', route: 'registerActivity' },
    { label: 'Ver eventos programados', icon: 'calendar_today', route: 'eventos' },
    { label: 'Confirmaciones Google Calendar', icon: 'check_circle', route: '/eventos/confirmaciones' },
    { label: 'Voluntarios por disponibilidad', icon: 'insights', route: '/reportes/voluntarios' },
    { label: 'Registrar Resultados', icon: 'emoji_events', route: 'register-results' }

  ];

  changeView(item: string) {
    this.userService.setUser(item);
  }

}
