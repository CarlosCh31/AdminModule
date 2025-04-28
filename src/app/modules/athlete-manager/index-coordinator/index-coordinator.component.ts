import {Component, inject} from '@angular/core';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {VolunteerListComponent} from '../../../shared/volunteer/volunteer-list/volunteer-list.component';

import {ActivityRegisterComponent} from '../../../shared/activity/activity-register/activity-register.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {UserService} from '../../../core/user.service';
import {CalendarioComponent} from '../calendario/calendario.component';
import {ProgramasComponent} from '../programas/programas.component';

@Component({
  selector: 'app-index-coordinator',
  imports: [
    SideBarComponent,
    NavbarComponent,
    VolunteerListComponent,
    ActivityRegisterComponent,
    DashboardComponent,
    ProgramasComponent,
    CalendarioComponent
  ],
  templateUrl: './index-coordinator.component.html',
  styleUrl: './index-coordinator.component.scss'
})
export class IndexCoordinatorComponent {
  protected userService = inject(UserService);
}
