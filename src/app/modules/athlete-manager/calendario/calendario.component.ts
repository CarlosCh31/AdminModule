import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaSemanalComponent } from '../vista-semanal/vista-semanal.component';
import { VistaMensualComponent } from '../vista-mensual/vista-mensual.component';
import { FormsModule } from '@angular/forms';
import { ActivityRegisterComponent } from '../../../shared/activity/activity-register/activity-register.component';

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
  showAddEventModal = false;
  showDatePicker = false;

  months = [
    { name: 'Ene', index: 0 },
    { name: 'Feb', index: 1 },
    { name: 'Mar', index: 2 },
    { name: 'Abr', index: 3 },
    { name: 'May', index: 4 },
    { name: 'Jun', index: 5 },
    { name: 'Jul', index: 6 },
    { name: 'Ago', index: 7 },
    { name: 'Sep', index: 8 },
    { name: 'Oct', index: 9 },
    { name: 'Nov', index: 10 },
    { name: 'Dic', index: 11 }
  ];

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
    this.showDatePicker = false;
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  selectMonth(monthIndex: number) {
    this.currentDate.setMonth(monthIndex);
    this.currentDate = new Date(this.currentDate);
    this.showDatePicker = false;
  }

  changeYear(offset: number) {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + offset);
    this.currentDate = new Date(this.currentDate);
  }

  getMonthName(): string {
    return this.months[this.currentDate.getMonth()].name;
  }

  openAddEventModal() {
    this.showAddEventModal = true;
  }

  closeAddEventModal() {
    this.showAddEventModal = false;
  }
}
