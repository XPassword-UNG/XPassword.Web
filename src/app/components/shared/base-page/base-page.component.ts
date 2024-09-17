import { Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Authenticator } from '../../auth/authenticator';

export class BasePageComponent {
  private router: Router;
  private toastr: ToastrService;
  protected auth: Authenticator;

  constructor(
    injector: Injector,
  ) {
    this.router = injector.get(Router);
    this.auth = injector.get(Authenticator);
    this.toastr = injector.get(ToastrService);
  }

  checkToken(): void {
    const lifeTime = this.auth.getLifeTime();

    if (!lifeTime) {
      this.auth.clean();
      this.showError('Token de Login expirou! Por favor entre novamente!', 'Token expirou', 'login');
      return;
    }

    const savedTime = parseInt(lifeTime, 10);
    const currentTime = Date.now();

    if (currentTime > savedTime) {
      this.auth.clean();
      this.showError('Token de Login expirou! Por favor entre novamente!', 'Token expirou', 'login');
    }
  }

  redirectTo(url: string): void {
    this.router.navigate([url]);
  }

  showSuccess(message: string = '', title: string | undefined = 'Sucesso!', redirect?: string): void {
    this.toastr.success(message, title);

    if (redirect)
      this.redirectTo(redirect);
  }

  showWarn(message: string | undefined = '', title: string = 'Aviso!', redirect?: string): void {
    this.toastr.warning(message, title);

    if (redirect)
      this.redirectTo(redirect);
  }

  showError(message: string | undefined = '', title: string = 'Erro!', redirect?: string): void {
    this.toastr.error(message, title);

    if (redirect)
      this.redirectTo(redirect);
  }

  validateError(err: any): void {
    if (typeof (err.error) == typeof ('T'))
      this.showError(err.error);

    if (err.error as any[]) {
      err.error.forEach((e: { message: string; }) => {
        this.showError(e.message);
      });
      return;
    }

    this.auth.clean();
    this.showError('Token de Login expirou! Por favor entre novamente!', 'Token expirou', 'login');
  }
}