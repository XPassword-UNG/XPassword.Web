import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { AccountCreationRequest } from '../../model/account-creation-request.model';
import { ToastrService } from 'ngx-toastr';
import { Authenticator } from '../authenticator';
import { Authentication } from '../../model/authentication.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Authenticator,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  createAccount() {
    const accountRequest: AccountCreationRequest = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    };

    this.accountService.putCreateAccount(accountRequest)
      .subscribe({
        next: (val) => {
          if (val.success == false) {
            this.toastr.error(val.error, 'Error')
            return;
          }

          const authentication: Authentication = {
            token: val.token,
            lifeTime: val.lifeTime
          }

          this.auth.setAuth(authentication);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          if (err.error as any[]) {
            err.error.forEach((e: { message: string; }) => {
              this.toastr.error(e.message, 'Error');
            });
            return;
          }

          this.auth.clean();
          this.toastr.error('Unexpected error', 'Error');
        }
      })
  }
}