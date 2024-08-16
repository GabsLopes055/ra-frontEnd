import { Component, Input } from '@angular/core';

@Component({
  selector: 'gbs-chips',
  standalone: true,
  imports: [],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {

  @Input() label: string = "";
  @Input() color: string = "";
  @Input() icon: string = "";
  @Input() border: boolean = true;

}
