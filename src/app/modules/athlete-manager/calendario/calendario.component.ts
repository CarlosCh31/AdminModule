import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaSemanalComponent } from '../vista-semanal/vista-semanal.component';
import { VistaMensualComponent } from '../vista-mensual/vista-mensual.component';
import { FormsModule } from '@angular/forms';
import {ActivityRegisterComponent} from '../../../shared/activity/activity-register/activity-register.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, VistaSemanalComponent, VistaMensualComponent, ActivityRegisterComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  currentView: 'week' | 'month' = 'month';
  searchQuery = '';
  currentDate = new Date();
  showAddEventModal= false;

  changeView(view: 'week' | 'month') {
    this.currentView = view;
  }

  previous() {
    if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
    this.currentDate = new Date(this.currentDate);
  }

  next() {
    if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    this.currentDate = new Date(this.currentDate);
  }

  today() {
    this.currentDate = new Date();
  }

  openAddEventModal() {
    this.showAddEventModal = true;
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
  }
}
