import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/env/environment';
import { AddRegisterRequest } from '../model/add-registers-request.model';
import { Register } from '../model/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = enviroment.registerApiUrl;
  }

  getRegisters(): Observable<any> {
    return this.http.get(this.apiUrl + '/GetRegisters');
  }

  addRegisters(request: AddRegisterRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/AddRegisters', request);
  }

  updateRegister(request: Register): Observable<any> {
    return this.http.put(this.apiUrl + '/UpdateRegister', request);
  }

  deleteRegister(request: Register): Observable<any> {
    return this.http.delete(this.apiUrl + '/DeleteRegister', { body: request });
  }
}