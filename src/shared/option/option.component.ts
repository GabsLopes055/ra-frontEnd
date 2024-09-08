import { Component, EventEmitter, Input, Output } from '@angular/core';
import { optionsInput } from '../input/input.component';

@Component({
  selector: 'gbs-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {

  @Input() label!: string;
  @Input() value!: string;
  @Output() click = new EventEmitter<void>();

  passarValorSelecionado!: optionsInput;

  onSelect() {
    this.click.emit();
  }

}
