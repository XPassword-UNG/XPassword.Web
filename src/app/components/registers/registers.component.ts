import { Component, Injector, OnInit } from '@angular/core';
import { BasePageComponent } from '../shared/base-page/base-page.component';
import { RegisterService } from '../services/register.service';
import { Register } from '../model/register.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { EditRegisterModalComponent } from './edit-register-modal/edit-register-modal.component';
import { RegisterModalComponent } from '../dashboard/register-modal/register-modal.component';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent extends BasePageComponent implements OnInit {

  registers: Register[] = [];
  displayedColumns: string[] = ['title', 'actions'];
  filteredPasswords = new MatTableDataSource<Register>();

  searchText: string = '';
  sortOption: string = '';

  constructor(
    injector: Injector,
    private dialog: MatDialog,
    private registerService: RegisterService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadRegisters();
  }

  loadRegisters(): void {
    this.registerService.getRegisters()
      .subscribe({
        next: (res) => {
          if (!res.success) {
            this.showError(res.error);
            return;
          }

          this.registers = res.registers;
          this.applyFilters();
        },
        error: (err) => { this.validateError(err); }
      });
  }

  applyFilters(triggeredBySearch: boolean = false): void {

    let filteredData = this.registers;

    if (this.searchText) {
      filteredData = filteredData.filter((p) =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (triggeredBySearch) {
      this.filteredPasswords.data = filteredData;
      return;
    }

    switch (this.sortOption) {
      case 'nameAsc':
        filteredData = filteredData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case 'nameDesc':
        filteredData = filteredData.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      default:
        break;
    }

    this.filteredPasswords.data = filteredData;
  }

  openAddNewModal() {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!(result.success as boolean)) {
          this.showError(result.error);
          return;
        }

        this.loadRegisters();
        this.showSuccess('Registro adicionado!');
      }
    });
  }

  openEditRegisterModal(register: Register) {
    const dialogRef = this.dialog.open(EditRegisterModalComponent, {
      width: '300px',
      data: register,
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (updatedRegister) => {
          if (!updatedRegister)
            return;

          this.registerService.updateRegister(updatedRegister)
            .subscribe({
              next: (res) => {
                if (!res.success) {
                  this.showError(res.error);
                  return;
                }

                this.loadRegisters();

                if (register.name == updatedRegister.name)
                  this.showSuccess(`${register.name} atualizado!`);
                else
                  this.showSuccess(`${register.name} -> ${updatedRegister.name} atualizado!`);
              },
              error: (err) => { this.validateError(err); }
            });
        }
      });
  }

  openDeleteConfirmationModal(register: Register) {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      width: '300px',
      data: register,
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (del) => {
          if (!del)
            return;

          this.registerService.deleteRegister(register)
            .subscribe({
              next: (res) => {
                if (!res.success) {
                  this.showError(res.error);
                  return;
                }

                this.loadRegisters();
                this.showSuccess(`${register.name} foi excluído com sucesso!`);
              },
              error: (err) => { this.validateError(err); }
            });
        }
      });
  }
}
