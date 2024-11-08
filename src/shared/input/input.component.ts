import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gbs-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {

  isFocused!: boolean;
  isSelect!: boolean;

  @Input() error: boolean = false;
  @Input() type: string = 'text';
  @Input() icon!: string;
  @Input() options!: optionsInput[];
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() mask: string = '';
  @Input() disabled: boolean = false;
  @Input() iconPosition: string = 'right';

  @Output() optionSelecionado = new EventEmitter();

  constructor(){}

  retornarOptionSelecionado() {

    console.log(this.isSelect + 'aqui')

    if(this.isSelect) {
      this.optionSelecionado.emit(this.options);
    }
  }

}

export interface optionsInput {
  label: string;
  value: string;
}
