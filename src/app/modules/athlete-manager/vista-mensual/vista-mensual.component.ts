import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDTO, ActivityService } from '../../../core/activity.service';

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
  daysOfMonth: { dayNumber: number, activities: ActivityDTO[] }[] = [];

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

    this.monthName = this.getMonthName(month) + ' ' + year;

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo, 1 = Lunes
    const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Para que lunes sea 0

    this.daysOfMonth = [];

    // Insertar espacios vacíos al principio si no empieza en lunes
    for (let i = 0; i < adjustedFirstDay; i++) {
      this.daysOfMonth.push({ dayNumber: null as any, activities: [] });
    }

    // Insertar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      this.daysOfMonth.push({ dayNumber: day, activities: [] });
    }

    // Insertar espacios al final para completar las filas
    while (this.daysOfMonth.length % 7 !== 0) {
      this.daysOfMonth.push({ dayNumber: null as any, activities: [] });
    }

    // Asignar actividades a días
    this.allActivities.forEach(activity => {
      const activityDate = new Date(activity.date);

      if (activityDate.getFullYear() === year && activityDate.getMonth() === month) {
        const dayNumber = activityDate.getDate();

        const dayObj = this.daysOfMonth.find(d => d.dayNumber === dayNumber);

        if (dayObj && (this.searchQuery.trim() === '' ||
          activity.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          activity.type.toLowerCase().includes(this.searchQuery.toLowerCase()))) {

          dayObj.activities.push(activity);
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

  isToday(dayNumber: number): boolean {
    const today = new Date();
    return today.getDate() === dayNumber &&
      today.getMonth() === this.currentDate.getMonth() &&
      today.getFullYear() === this.currentDate.getFullYear();
  }
}
