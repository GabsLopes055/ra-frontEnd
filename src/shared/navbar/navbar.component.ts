import { Component } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'gbs-navbar',
  standalone: true,
  imports: [
    DividerComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  title: any;

  constructor(
    private readonly navbarService: NavbarService
  ) {
    this.title = this.navbarService.title;
  }

}
