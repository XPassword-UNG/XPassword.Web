import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Authenticator } from './authenticator';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private router: Router,
    private auth: Authenticator
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.auth.getToken();
    const isLoggedIn = token != null;

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}