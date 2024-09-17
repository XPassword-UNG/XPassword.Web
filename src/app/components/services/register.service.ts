import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/env/environment';
import { AddRegisterRequest } from '../model/add-registers-request.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = enviroment.registerApiUrl;
  }

  addRegisters(request: AddRegisterRequest): Observable<any> {
    return this.http.put(this.apiUrl + '/AddRegisters', request);
  }

  getRegisters(): Observable<any> {
    return this.http.get(this.apiUrl + '/GetRegisters');
  }
}