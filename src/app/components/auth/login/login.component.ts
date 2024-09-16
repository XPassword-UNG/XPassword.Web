import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LoginRequest } from '../../model/login-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Authentication } from '../../model/authentication.model';
import { Authenticator } from '../authenticator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Authenticator,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn() {
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.accountService.postLogIn(loginRequest)
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