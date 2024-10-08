import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gbs-chips',
  standalone: true,
  imports: [],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent {
  @Input() label: string | null = '';
  @Input() color: string = '';
  @Input() icon: string = '';
  @Input() border: boolean = true;
  @Input() active!: boolean;

  @Output() change = new EventEmitter();

  public changeValue() {
    this.change.emit(this.active);
  }
}
