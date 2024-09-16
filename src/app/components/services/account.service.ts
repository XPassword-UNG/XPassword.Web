import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/env/environment';
import { AccountCreationRequest } from '../model/account-creation-request.model';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = enviroment.accountApiUrl;
  }

  postLogIn(request: LoginRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/LogIn', request);
  }

  putCreateAccount(request: AccountCreationRequest): Observable<any> {
    return this.http.put(this.apiUrl + '/SignIn', request);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(this.apiUrl + '/DeleteAccount');
  }
}