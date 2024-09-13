import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { optionsInput } from '../input/input.component';
import { NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gbs-select',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {


  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() options: optionsInput[] = [];
  @Output() retornarOptionSelecionado = new EventEmitter<string>();

  nomeProdutoSelecionado: string = '';
  isOpen = false;
  isFocused!: boolean;
  selectedOption: optionsInput | null = null;

  ngOnInit() {
    if (this.control && this.control.value) {
      this.selectedOption = this.options.find(option => option.value === this.control.value) || null;
    }
  }

  abrirOption() {
    this.isOpen = !this.isOpen;
  }

  selecionarOption(option: optionsInput) {
    this.selectedOption = option;
    this.control.setValue(option.value);
    this.abrirOption();
    // this.retornarOptionSelecionado.emit(option.value)
  }

  fecharOption() {
    this.isOpen = false;
  }
}
