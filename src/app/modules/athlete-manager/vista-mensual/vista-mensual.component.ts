import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDTO, ActivityService } from '../../../core/activity.service';

interface DayInfo {
  dayNumber: number;
  activities: ActivityDTO[];
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-vista-mensual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-mensual.component.html',
  styleUrls: ['./vista-mensual.component.scss']
})
export class VistaMensualComponent implements OnChanges {
  @Input() currentDate!: Date;
  @Input() searchQuery = '';

  allActivities: ActivityDTO[] = [];
  daysOfMonth: DayInfo[] = [];
  weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  monthName = '';

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
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    this.monthName = this.getMonthName(month) + ' ' + year;
    this.daysOfMonth = [];

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const dayActivities = this.allActivities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate.getDate() === day &&
          activityDate.getMonth() === month &&
          activityDate.getFullYear() === year &&
          (this.searchQuery.trim() === '' ||
            activity.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            activity.type.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });

      this.daysOfMonth.push({
        dayNumber: day,
        activities: dayActivities,
        isCurrentMonth: true
      });

      dayActivities.forEach(activity => this.assignColorToType(activity.type));
    }
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

  isToday(dayNumber: number): boolean {
    const today = new Date();
    return today.getDate() === dayNumber &&
      today.getMonth() === this.currentDate.getMonth() &&
      today.getFullYear() === this.currentDate.getFullYear();
  }

  getDayOffset(): number {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
    // Ajuste para que Lunes sea 0
    return firstDay === 0 ? 6 : firstDay - 1;
  }
}
