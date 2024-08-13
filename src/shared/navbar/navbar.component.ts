import { Component } from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { NavbarService } from './navbar.service';
import { CircleUsuarioComponent } from '../circle-usuario/circle-usuario.component';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'gbs-navbar',
  standalone: true,
  imports: [
    DividerComponent,
    CircleUsuarioComponent,
    InputComponent
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
