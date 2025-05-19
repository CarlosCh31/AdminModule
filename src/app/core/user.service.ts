import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private toggleView: any = null;

  constructor() {}

  setUser(data: any): void {
    this.toggleView = data;
  }

  getUser(): any {
    return this.toggleView;
  }

  clearUser(): void {
    this.toggleView = null;
  }
}
