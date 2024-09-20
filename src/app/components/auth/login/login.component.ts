import { Component, Injector } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LoginRequest } from '../../model/login-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authentication } from '../../model/authentication.model';
import { BasePageComponent } from '../../shared/base-page/base-page.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponent {

  loginForm: FormGroup;

  constructor(
    private injector: Injector,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    super(injector);
    
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
            this.showWarn(val.error)
            return;
          }

          const authentication: Authentication = {
            token: val.token,
            lifeTime: val.lifeTime
          }

          this.auth.setAuth(authentication);
          this.redirectTo('dashboard');
        },
        error: (err) => { this.validateError(err); }
      })
  }
}