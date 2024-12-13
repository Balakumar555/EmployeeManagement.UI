import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  getToken(): string {
    if (!localStorage) {
      throw new Error('LocalStorage is not available');
    }
    return localStorage.getItem('AccessToken') || '';
  }

  setToken(token: string): void {
    if (localStorage) {
      localStorage.setItem('AccessToken', token);
    }
  }
}