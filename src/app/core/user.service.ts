import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private toggleView: any = null; // Variable compartida

  constructor() {}

  // Método para establecer el usuario
  setUser(data: any): void {
    this.toggleView = data;
  }

  // Método para obtener el usuario
  getUser(): any {
    return this.toggleView;
  }

  // Método para limpiar los datos
  clearUser(): void {
    this.toggleView = null;
  }
}
