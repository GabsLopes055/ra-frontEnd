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
  @Output() click = new EventEmitter<optionsInput>();

  passarValorSelecionado!: optionsInput;

  onSelect() {

    this.passarValorSelecionado = { label: this.label, value: this.value };

    this.click.emit(this.passarValorSelecionado);
  }

}
