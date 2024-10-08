import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'gbs-date',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {

  @Output() change = new EventEmitter<Date>();

  @Input() active!: boolean;

  emitirValor(event: Event) {
    const input = event.target as HTMLInputElement;
    this.change.emit(new Date(input.value));
  }
}
