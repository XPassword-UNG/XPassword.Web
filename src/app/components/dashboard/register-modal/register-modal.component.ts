import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Register } from '../../model/register.model';
import { AddRegisterRequest } from '../../model/add-registers-request.model';
import { BasePageComponent } from '../../shared/base-page/base-page.component';

const downCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789'
const especialChars = '!@#$%^&*';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent extends BasePageComponent {
  passwordForm: FormGroup;
  hidePassword = true;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterModalComponent>,
    private registerService: RegisterService
  ) {
    super(injector);
    this.passwordForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      notes: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.passwordForm.valid)
      return;

    const newPassword: Register = {
      id: 0,
      userId: 0,
      name: this.passwordForm.value.name,
      email: this.passwordForm.value.email,
      password: this.passwordForm.value.password,
      description: this.passwordForm.value.notes
    };
    const request: AddRegisterRequest = {
      registerList: [newPassword]
    };
    this.registerService.addRegisters(request)
      .subscribe({
        next: (res) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          this.validateError(err);
          this.dialogRef.close(err);
        }
      });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  generatePassword(): void {
    const randomPassword = this.createRandomPassword();
    this.passwordForm.get('password')?.setValue(randomPassword);
  }

  createRandomPassword(): string {
    let password = '';
    password += this.getRandomCharacter(downCase);
    password += this.getRandomCharacter(upperCase);
    password += this.getRandomCharacter(especialChars);
    password += this.getRandomCharacter(numbers);
    const all = downCase + upperCase + especialChars + numbers;

    for (let i = 0; i < 10; ++i)
      password += this.getRandomCharacter(all);

    return [...password].sort(() => Math.random() - .5).join('');;
  }

  private getRandomCharacter(charset: string) {
    var index = Math.floor(Math.random() * charset.length)
    return charset[index];
  }
}
