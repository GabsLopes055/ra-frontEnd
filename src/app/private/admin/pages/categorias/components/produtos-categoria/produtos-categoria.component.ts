import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias.service';
import { categoriaComProdutos } from '../../../../../../interfaces/categoria.model';
import { TableComponent } from "../../../../../../../shared/table/table.component";
import { PaginatorComponent } from "../../../../../../../shared/paginator/paginator.component";

@Component({
  selector: 'app-produtos-categoria',
  standalone: true,
  imports: [TableComponent, PaginatorComponent],
  templateUrl: './produtos-categoria.component.html',
  styleUrl: './produtos-categoria.component.scss'
})
export class ProdutosCategoriaComponent implements OnInit, OnDestroy {

  categoriaComProdutos!: categoriaComProdutos;
  headers = ['Nome', 'Venda', 'Custo', 'Quantidade'];
  @Input() idCategoria: any;

  constructor(
    private readonly categoriaService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.listarProdutosPorCategoria();
  }

  ngOnDestroy(): void {
    this.categoriaService.listarProdutosDaCategoria.next(null);
  }

  listarProdutosPorCategoria() {
    this.categoriaService.listarProdutosPorCategoria(this.idCategoria).subscribe({
      next: (value) => {
        this.categoriaComProdutos = value
        console.log(value.produtoResponses)
      }
    })
  }

}
