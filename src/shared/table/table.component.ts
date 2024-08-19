import { Component, Input } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Role, usuario } from '../../app/interfaces/usuario.model';
import { ButtonComponent } from '../button/button.component';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'gbs-table',
  standalone: true,
  imports: [ListComponent, ButtonComponent, StatusComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() headers!: any;
  @Input() body: usuario[] = [];

  retornarPermissao(role: string): string {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'MANAGER':
        return 'Gerente';
      case 'SUPPORT':
        return 'Suporte';
      case 'USER':
        return 'Usuário';
      default:
        return '';
    }
  }
}
