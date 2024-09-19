import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class Authenticator {

  isLogged(): boolean {
    return this.getToken() != null;
  }

  setAuth(auth: Authentication): void {
    const lifeTime: number = Date.now() + auth.lifeTime * 1000;
    localStorage.setItem('accessToken', auth.token);
    localStorage.setItem('lifeTime', lifeTime.toString());
  }

  getLifeTime(): string | null {
    return localStorage.getItem('lifeTime');
  }

  getToken(): string | null {
    const lifeTime = localStorage.getItem('lifeTime');

    if (!lifeTime) {
      this.clean();
      return null;
    }

    const savedTime = parseInt(lifeTime, 10);
    const currentTime = Date.now();

    if (currentTime > savedTime) {
      this.clean();
      return null;
    }

    return localStorage.getItem('accessToken');
  }

  clean(): void {
    localStorage.removeItem('lifeTime');
    localStorage.removeItem('accessToken');
  }
}