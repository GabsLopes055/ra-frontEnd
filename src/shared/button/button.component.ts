import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'gbs-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() icon!:string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fieldButton: 'outline' | 'field' = 'field';
  @Input() color: TypeColors = 'primary';
  @Input() disabled: boolean = false;
  @Input() border: boolean = true;
  @Input() size: 'small' | 'middle' = 'middle';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() label: string = '';

  protected hover = false;

  @HostListener('mouseleave') onMouseLeave() {
    this.hover = false;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hover = true;
  }


  colors: Colors = {
    primary: '#f44336',
    secundary: '#0C0C0C',
    warning: '',
    success: '',
    error: '#EE0D43'
  }

}
type TypeColors = 'primary' | 'secundary' | 'warning' | 'success' | 'error';

type Colors = {
  [key in TypeColors]: string;
  }
