import { Component, Inject, OnInit } from '@angular/core';
import { Register } from '../../model/register.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const downCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789'
const especialChars = '!@#$%^&*';

@Component({
  selector: 'app-edit-register-modal',
  templateUrl: './edit-register-modal.component.html',
  styleUrls: ['./edit-register-modal.component.scss']
})
export class EditRegisterModalComponent {
  editRegisterForm: FormGroup;
  registerEntry: Register;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditRegisterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Register
  ) {
    this.registerEntry = data;
    this.editRegisterForm = this.fb.group({
      name: [this.registerEntry.name, Validators.required],
      email: [this.registerEntry.email, Validators.required],
      password: [this.registerEntry.password, Validators.required],
      notes: [this.registerEntry.description],
    });
  }

  onSubmit(): void {
    if (this.editRegisterForm!.valid) {
      const updatedRegister: Register = {
        id: this.registerEntry.id,
        userId: this.registerEntry.userId,
        name: this.editRegisterForm!.value.name,
        password: this.editRegisterForm!.value.password,
        email: this.editRegisterForm!.value.email,
        description: this.editRegisterForm!.value.notes
      };

      this.dialogRef.close(updatedRegister);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  generatePassword(): void {
    const randomPassword = this.createRandomPassword();
    this.editRegisterForm.get('password')?.setValue(randomPassword);
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