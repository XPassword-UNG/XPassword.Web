// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { PasswordEntry, RegisterService } from '../services/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  passwords: PasswordEntry[] = [];
  totalPasswords: number = 0;
  securePasswords: number = 0;
  passwordScore: number = 0;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.loadPasswords();
  }

  loadPasswords() {
    this.registerService.getPasswords().subscribe((data) => {
      this.passwords = data;
      this.calculateStats();
      this.renderCharts();
    });
  }

  calculateStats() {
    this.totalPasswords = this.passwords.length;
    this.securePasswords = this.passwords.filter((p) => p.isSecure).length;
    this.passwordScore = this.calculatePasswordScore();
  }

  calculatePasswordScore(): number {
    if (this.totalPasswords === 0) return 0;
    const totalStrength = this.passwords.reduce((sum, p) => sum + p.strength, 0);
    return Math.round(totalStrength / this.totalPasswords);
  }

  renderCharts() {
    // Placeholder for chart rendering logic
  }

  openAddPasswordModal() {
    // Logic to open the modal (we'll implement this later)
  }
}
