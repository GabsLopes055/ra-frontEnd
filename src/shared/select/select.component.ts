import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { OptionComponent } from '../option/option.component';
import { optionsInput } from '../input/input.component';

@Component({
  selector: 'gbs-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {

  @Input() placeholder!: string;
  @Output() valueChange = new EventEmitter<any>();

  passarValorSelecionado!: optionsInput;

  @ContentChildren(SelectComponent) options!: QueryList<OptionComponent>;

  selectedLabel: string | undefined;
  isOpen = false;

  ngAfterContentInit() {
    this.options.forEach((option) => {
      option.click.subscribe(() => {
        this.selectOption(option);
      });
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: OptionComponent) {
    console.log("aquiiiii")
    this.selectedLabel = option.label;
    this.valueChange.emit(this.passarValorSelecionado);
    this.isOpen = false;
  }
}
