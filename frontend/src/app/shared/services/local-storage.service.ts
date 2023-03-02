import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private router: Router) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
