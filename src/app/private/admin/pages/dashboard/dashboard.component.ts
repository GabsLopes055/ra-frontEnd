import { Component } from '@angular/core';

import { MenuComponent } from '../../../../../shared/menu/menu.component';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarComponent } from '../../../../../shared/navbar/navbar.component';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MenuComponent,
    NavbarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor(
    private readonly menuService: MenuService,
    private readonly navbarService: NavbarService
  ){
    this.menuService.setMenu({icon: 'dashboard', label: 'Dashboard', route: '', checked: true});
    this.navbarService.setTitle('Dashboard');
  }

}

