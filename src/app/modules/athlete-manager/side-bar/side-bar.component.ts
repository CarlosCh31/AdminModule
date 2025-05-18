import {Component, inject} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {NgForOf} from '@angular/common';
import {UserService} from '../../../core/user.service';

@Component({
  selector: 'app-side-bar',
  imports: [
    MatSidenavContainer,
    MatIcon,
    NgForOf,
    MatSidenav
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  private userService = inject(UserService);

  sidebarOptions = [
    { label: 'Métricas', icon: 'dashboard', view: 'dashboard' },
    { label: 'Iniciación Deportiva Integral', icon: 'sports_handball', view: 'Iniciacion' },
    { label: 'Voluntarios', icon: 'group', view: 'volunteer-list' },
    { label: 'Crear Nuevo Evento', icon: 'event', view: 'registerActivity' },
    { label: 'Calendario', icon: 'calendar_today', view: 'calendar' },
  ];

  changeView(view: string) {
    this.userService.setUser(view);
  }
}
