import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class Authenticator {

  setAuth(auth: Authentication): void {
    const lifeTime: number = Date.now() + auth.lifeTime * 1000;
    localStorage.setItem('accessToken', auth.token);
    localStorage.setItem('lifeTime', lifeTime.toString());
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