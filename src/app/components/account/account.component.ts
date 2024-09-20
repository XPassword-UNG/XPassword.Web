import { Component, Injector } from '@angular/core';
import { BasePageComponent } from '../shared/base-page/base-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Account } from '../model/account.model';
import { AccountUpdateRequest } from '../model/account-update-request.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BasePageComponent {

  accountForm: FormGroup;
  originalProfile?: Account;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    super(injector);
    this.loadUserProfile();

    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUserProfile(): void {
    this.accountService.getUserData()
      .subscribe({
        next: (res) => {
          if (!res.success) {
            this.showWarn(res.error);
            return;
          }

          this.originalProfile = res.account;
          this.onCancel();
        },
        error: (err) => { this.validateError(err); }
      });
  }
  
  onSubmit(): void {
    if (this.accountForm.valid) {
      const updatedProfile: AccountUpdateRequest = {
        email: this.accountForm.value.email,
        username: this.accountForm.value.name,
      };
      
      console.log(updatedProfile);
    }
  }

  onCancel(): void {
    this.accountForm.reset({ 
      name: this.originalProfile?.name, 
      email: this.originalProfile?.email
    });
  }
}