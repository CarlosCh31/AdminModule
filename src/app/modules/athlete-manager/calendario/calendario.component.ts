import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaSemanalComponent } from '../vista-semanal/vista-semanal.component';
import { VistaMensualComponent } from '../vista-mensual/vista-mensual.component';
import { FormsModule } from '@angular/forms';
import { ActivityRegisterComponent } from '../../../shared/activity/activity-register/activity-register.component';
import { ActivityDTO } from '../../../core/activity.service';

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
  selectedActivity: ActivityDTO | null = null;
  showActivityModal = false;

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

  typeColorMap = new Map<string, string>([
    ['deporte', '#66bb6a'],
    ['taller', '#ffa726'],
    ['charla', '#ab47bc'],
    ['foro', '#42a5f5']
  ]);

  colorPalette = ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#26a69a', '#ef5350', '#ffca28', '#8d6e63', '#78909c'];
  nextColorIndex = 0;

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

  onActivityAdded() {
    this.closeAddEventModal();
    this.currentDate = new Date(this.currentDate);
  }

  onActivitySelected(activity: ActivityDTO) {
    this.selectedActivity = activity;
    this.showActivityModal = true;
  }

  closeActivityModal() {
    this.showActivityModal = false;
    this.selectedActivity = null;
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  getTypeColor(type: string): string {
    const lowerType = type.toLowerCase();
    return this.typeColorMap.get(lowerType) || '#bdbdbd';
  }
}
