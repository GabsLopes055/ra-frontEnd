import { Component, Input } from '@angular/core';
import { StatusUser } from '../../app/interfaces/usuario.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'gbs-status',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

  @Input() status!: StatusUser;

  constructor() {
    console.log(this.status)
  }

  protected readonly statusCircle = StatusUser
}
