import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PasswordEntry {
  id: number;
  title: string;
  strength: number; // 0 to 100
  isSecure: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private passwords: PasswordEntry[] = [
    { id: 1, title: 'Email Account', strength: 80, isSecure: true },
    { id: 2, title: 'Bank Account', strength: 60, isSecure: true },
    { id: 3, title: 'Social Media', strength: 30, isSecure: false },
    // ... add more entries as needed
  ];

  getPasswords(): Observable<PasswordEntry[]> {
    return of(this.passwords);
  }

  // Methods to add, update, delete passwords can be added here
}
