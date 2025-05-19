import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDTO, ActivityService } from '../../../core/activity.service';

@Component({
  selector: 'app-vista-semanal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-semanal.component.html',
  styleUrls: ['./vista-semanal.component.scss']
})
export class VistaSemanalComponent implements OnChanges {

  @Input() currentDate!: Date;
  @Input() searchQuery = '';
  @Output() activitySelected = new EventEmitter<ActivityDTO>();

  weekDays = [
    { name: 'Lunes', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Martes', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Miércoles', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Jueves', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Viernes', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Sábado', activities: [] as ActivityDTO[], date: new Date() },
    { name: 'Domingo', activities: [] as ActivityDTO[], date: new Date() },
  ];

  weekTitle = '';

  allActivities: ActivityDTO[] = [];
  typeColorMap = new Map<string, string>();
  colorPalette = ['#42a5f5', '#66bb6a', '#ffa726', '#ab47bc', '#26a69a', '#ef5350', '#ffca28', '#8d6e63', '#78909c'];
  nextColorIndex = 0;

  constructor(private activityService: ActivityService) {}

  ngOnChanges() {
    this.activityService.getAll().subscribe((activities) => {
      this.allActivities = activities;
      this.organizeActivities();
    });
  }

  organizeActivities() {
    this.weekDays.forEach(day => {
      day.activities = [];
    });

    const monday = new Date(this.currentDate);
    monday.setDate(monday.getDate() - (monday.getDay() === 0 ? 6 : monday.getDay() - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    this.weekTitle = `Semana del ${monday.getDate()} al ${sunday.getDate()} de ${this.getMonthName(monday.getMonth())}`;

    this.weekDays.forEach((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      day.date = date;
    });

    this.allActivities.forEach(activity => {
      const activityDate = new Date(activity.date);

      if (activityDate >= monday && activityDate <= sunday) {
        const dayIndex = activityDate.getDay();
        const adjustedDayIndex = (dayIndex === 0) ? 6 : dayIndex - 1;

        if (this.searchQuery.trim() === '' ||
          activity.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          activity.type.toLowerCase().includes(this.searchQuery.toLowerCase())) {

          this.weekDays[adjustedDayIndex].activities.push(activity);
          this.assignColorToType(activity.type);
        }
      }
    });
  }

  getMonthName(month: number): string {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  }

  assignColorToType(type: string) {
    const lowerType = type.toLowerCase();
    if (!this.typeColorMap.has(lowerType)) {
      const color = this.colorPalette[this.nextColorIndex % this.colorPalette.length];
      this.typeColorMap.set(lowerType, color);
      this.nextColorIndex++;
    }
  }

  getTypeColor(type: string): string {
    const lowerType = type.toLowerCase();
    return this.typeColorMap.get(lowerType) || '#bdbdbd';
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();
  }

  onActivityClick(activity: ActivityDTO, event: MouseEvent) {
    event.stopPropagation();
    this.activitySelected.emit(activity);
  }
}
