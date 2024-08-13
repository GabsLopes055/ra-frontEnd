import { Component } from '@angular/core';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  tabs: Tab[] = [
    { icon: 'person', label: 'Usuarios', selected: true, value: 'usuarios' },
    { icon: 'person', label: 'Usuarios', selected: false, value: 'usuarios' },
  ];

  constructor(
    private readonly menuService: MenuService,
    private readonly navbarService: NavbarService
  ) {
    this.menuService.setMenu({
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/admin',
      checked: true,
    });
    this.navbarService.setTitle('Dashboard');
  }
}
