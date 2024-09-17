// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Register } from '../model/register.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  registers: Register[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {

  }

  ngOnInit(): void {
    this.loadPasswords();
  }

  loadPasswords() {
    this.registerService.getRegisters()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          if (err.error as any[]) {
            err.error.forEach((e: { message: string; }) => {
              this.toastr.error(e.message, 'Error');
            });
            return;
          }

          if (err.status == 401) {
            this.router.navigate(['login']);
            return;
          }

          this.toastr.error('Unexpected error', 'Error');
        }
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
        this.toastr.success('Password added successfully!');
      }
    });
  }
}