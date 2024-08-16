import { usuario } from './../../../../interfaces/usuario.model';
import { Component } from '@angular/core';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { ListComponent } from '../../../../../shared/table/list/list.component';
import { TableComponent } from '../../../../../shared/table/table.component';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabsComponent, TableComponent, ListComponent],
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
    private readonly navbarService: NavbarService,
  ) {
    this.menuService.setMenu({
      icon: 'dashboard',
      label: 'Dashboard',
      route: '',
      checked: true,
    });
    this.navbarService.setTitle('Dashboard');

  }
}
