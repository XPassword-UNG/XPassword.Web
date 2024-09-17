import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterModalComponent>,
    private registerService: RegisterService
  ) {
    this.passwordForm = this.fb.group({
      title: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      notes: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const newPassword = {
        id: 0, // Will be assigned in the service
        title: this.passwordForm.value.title,
        username: this.passwordForm.value.username,
        password: this.passwordForm.value.password,
        notes: this.passwordForm.value.notes,
        strength: this.evaluatePasswordStrength(this.passwordForm.value.password),
        isSecure: this.isPasswordSecure(this.passwordForm.value.password),
      };

      console.log(newPassword);
    }
  }

  evaluatePasswordStrength(password: string): number {
    // Implement a real password strength evaluation
    return Math.floor(Math.random() * 100) + 1;
  }

  isPasswordSecure(password: string): boolean {
    return this.evaluatePasswordStrength(password) >= 60;
  }
}
