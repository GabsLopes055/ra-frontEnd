import { Component } from '@angular/core';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { TableComponent } from "../../../../../shared/table/table.component";
import { usuario } from '../../../../interfaces/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {

  headers = ['ID', 'Nome', 'Email', 'Status', 'Tipo'];

  body: usuario[] = [
    {
      id: '1',
      nome: 'Gabriel Lopes',
      email: 'lopesgabriel055@gmail.com',
      status: 'ATIVO',
      tipo: 'ADMIN'
    },
    {
      id: '2',
      nome: 'Gabriel Lopes',
      email: 'lopesgabriel055@gmail.com',
      status: 'ATIVO',
      tipo: 'ADMIN'
    },
    {
      id: '2',
      nome: 'Gabriel Lopes',
      email: 'lopesgabriel055@gmail.com',
      status: 'ATIVO',
      tipo: 'ADMIN'
    }
  ];

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService
  ) {
    navbarService.setTitle("Usuarios");
    menuService.setMenu({
      icon: 'person',
      label: 'Usuarios',
      route: '/usuarios',
      checked: true,
    });
  }

}
