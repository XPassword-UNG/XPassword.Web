import { Component, Injector } from '@angular/core';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BasePageComponent {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }
}