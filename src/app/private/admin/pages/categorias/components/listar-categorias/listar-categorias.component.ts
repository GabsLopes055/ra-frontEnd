import { categoria } from './../../../../../../interfaces/categoria.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { CategoriasService } from '../../categorias.service';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { FiltroDeBusca } from '../../../../../../interfaces/paginated.model';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [TableComponent, ButtonComponent, PaginatorComponent],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.scss',
})
export class ListarCategoriasComponent implements OnInit, OnDestroy {
  headers: string[] = ['Nome Categoria', '', 'Ações'];
  subscriber = new Subscriber();

  categorias: any[] = [];

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  filtro: FiltroDeBusca = {
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly categoriaService: CategoriasService,
    private readonly toastService: ToastService
  ) {}

  listarCategorias() {
    this.categoriaService.listarCategorias(this.filtro).subscribe({
      next: (categorias) => {
        this.totalPages = categorias.totalPages;
        this.categorias = categorias.content;
      },
      error: (error) => {
        this.toastService.error(
          'Erro interno !',
          'Erro ao listar categorias !'
        );
      },
    });
  }

  listarProdutosDestaCategoria(idCategoria: string) {
    // console.log(idCategoria)
    this.categoriaService.listarProdutosDaCategoria.next(idCategoria);
  }

  passarPaginas(pagina: number) {
    this.filtro.pagina = pagina;
    this.listarCategorias();
  }

  ngOnInit(): void {
    this.subscriber.add(this.listarCategorias());
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
