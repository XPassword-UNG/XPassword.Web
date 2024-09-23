import { Component, Injector, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../model/register.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { BasePageComponent } from '../shared/base-page/base-page.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BasePageComponent implements OnInit {
  registers: Register[] = [];

  constructor(
    injector: Injector,
    private registerService: RegisterService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadPasswords();
    setInterval(() => { this.checkToken(); }, 30000);
  }

  loadPasswords() {
    this.registerService.getRegisters()
      .subscribe({
        next: (res) => {
          if (!(res.success as boolean)) {
            this.showError(res.error);
            return;
          }

          this.registers = res.registers as Register[];
        },
        error: (err) => { this.validateError(err); }
      })
  }
}