import { Component, Input } from '@angular/core';
import { ListComponent } from "./list/list.component";
import { usuario } from '../../app/interfaces/usuario.model';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'gbs-table',
  standalone: true,
  imports: [ListComponent, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {

  @Input() headers!: any;
  @Input() body: usuario[] = [];

  constructor() {
    // console.log(this.headers)
  }

}


