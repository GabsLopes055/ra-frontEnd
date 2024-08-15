import { Component, Input } from '@angular/core';
import { usuario } from '../../../app/interfaces/usuario.model';

@Component({
  selector: 'gbs-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() dados!: usuario;

}
