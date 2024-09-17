// dashboard.component.ts
import { Component, Injector, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../model/register.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    private injector: Injector,
    private dialog: MatDialog,
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
          console.log(res);
        },
        error: (err) => { this.validateError(err); }
      })
  }

  openAddPasswordModal() {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refresh the data
        this.loadPasswords();
        this.showSuccess('Password added successfully!');
      }
    });
  }
}