import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatBadgeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent {
  protected userService = inject(UserService);

  public notifications: number = 3;
  public messages: number = 1;

  constructor(private authService: AuthService, private router: Router) {}

  public logout(): void {
    console.log("Cerrando sesión...");
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  public perfil(): void {
    this.userService.setUser("perfil");
  }
}
