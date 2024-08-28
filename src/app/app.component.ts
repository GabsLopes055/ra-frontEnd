import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { Menu, MenuService } from '../shared/menu/menu.service';
import { MenuComponent } from '../shared/menu/menu.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    MenuComponent,
    NavbarComponent,
    OverlayModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Lojas R&A';

  menuLateral: Menu[] = [];

  constructor(private readonly menuService: MenuService) {
    this.menuService._menu.subscribe((menu) => {
      this.menuLateral = menu;
    });
  }
}
