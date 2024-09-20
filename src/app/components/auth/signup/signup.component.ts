import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { AccountCreationRequest } from '../../model/account-creation-request.model';
import { Authentication } from '../../model/authentication.model';
import { BasePageComponent } from '../../shared/base-page/base-page.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BasePageComponent {

  signupForm: FormGroup;

  constructor(
    private injector: Injector,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    super(injector);
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