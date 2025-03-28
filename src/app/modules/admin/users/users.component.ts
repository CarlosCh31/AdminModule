import {Component, inject} from '@angular/core';
import {AdminNavbarComponent} from '../navbar/navbar.component';
import {AdminSidebarComponent} from '../admin-sidebar/admin-sidebar.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {UserService} from '../../../core/user.service';
import {RegisterComponent} from '../../auth/register/register.component';

import {ActivityRegisterComponent} from '../../../shared/activity/activity-register/activity-register.component';
import {AdminListComponent} from "../admin-list/admin-list.component";
import {ActivityListComponent} from '../../../shared/activity/activity-list/activity-list.component';
import {AthleteListComponent} from '../athlete-list/athlete-list.component';
import { ResultsRegisterComponent } from '../../../shared/results-register/results-register.component';

@Component({
  selector: 'app-users',
  imports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    DashboardComponent,
    RegisterComponent,
    ActivityRegisterComponent,
    AdminListComponent,
    ActivityListComponent,
    AthleteListComponent,
    ResultsRegisterComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  protected userService = inject(UserService);

}
