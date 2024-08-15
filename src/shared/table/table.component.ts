import { Component, Input } from '@angular/core';
import { ListComponent } from "./list/list.component";
import { usuario } from '../../app/interfaces/usuario.model';

@Component({
  selector: 'gbs-table',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  titulo: string[] = ['Id', 'Nome', 'Usuario', 'Status', 'Permissão'];
  @Input() linha: usuario[] = [];
}


