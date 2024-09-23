import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { RegisterModalComponent } from './components/dashboard/register-modal/register-modal.component';
import { AccountComponent } from './components/account/account.component';
import { RegistersComponent } from './components/registers/registers.component';
import { DeleteConfirmationModalComponent } from './components/registers/delete-confirmation-modal/delete-confirmation-modal.component';
import { EditRegisterModalComponent } from './components/registers/edit-register-modal/edit-register-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    DashboardComponent,
    RegisterModalComponent,
    AccountComponent,
    RegistersComponent,
    DeleteConfirmationModalComponent,
    EditRegisterModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      tapToDismiss: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }