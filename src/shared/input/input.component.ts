import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gbs-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type!: string;
  @Input() icon!: string;
  @Input() options!: optionsInput[];
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() mask: string = '';
  @Input() iconPosition: string = 'right';
}

export interface optionsInput {
  label: string;
  value: string;
}
