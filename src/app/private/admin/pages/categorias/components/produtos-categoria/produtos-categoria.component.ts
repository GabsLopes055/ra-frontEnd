import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-produtos-categoria',
  standalone: true,
  imports: [],
  templateUrl: './produtos-categoria.component.html',
  styleUrl: './produtos-categoria.component.scss'
})
export class ProdutosCategoriaComponent {


  @Input() idCategoria: any;

  constructor() {
    console.log(this.idCategoria)
  }

}
