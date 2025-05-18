import {Component, inject} from '@angular/core';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {VolunteerListComponent} from '../../../shared/volunteer/volunteer-list/volunteer-list.component';
import {DashboardComponent} from '../../admin/dashboard/dashboard.component';
import {ActivityRegisterComponent} from '../../../shared/activity/activity-register/activity-register.component';
import {UserService} from '../../../core/user.service';
import {CalendarioComponent} from '../calendario/calendario.component';
import {ProgramasComponent} from '../programas/programas.component';
import {CoordinatorProfileComponent} from '../../../shared/coordinator-profile/coordinator-profile.component';
import {AdminNavbarComponent} from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-index-coordinator',
  imports: [
    SideBarComponent,
    VolunteerListComponent,
    ActivityRegisterComponent,
    ProgramasComponent,
    CalendarioComponent,
    CoordinatorProfileComponent,
    AdminNavbarComponent,
    DashboardComponent
  ],
  templateUrl: './index-coordinator.component.html',
  styleUrl: './index-coordinator.component.scss'
})
export class IndexCoordinatorComponent {
  protected userService = inject(UserService);
}
