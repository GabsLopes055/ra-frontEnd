import { categoria } from './../../../../../../interfaces/categoria.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { CategoriasService } from '../../categorias.service';
import { TableComponent } from "../../../../../../../shared/table/table.component";
import { ButtonComponent } from "../../../../../../../shared/button/button.component";
import { PaginatorComponent } from "../../../../../../../shared/paginator/paginator.component";

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [TableComponent, ButtonComponent, PaginatorComponent],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.scss',
})
export class ListarCategoriasComponent implements OnInit, OnDestroy {

  headers: string[] = ['Nome Categoria', '', 'Ações']
  subscriber = new Subscriber();
  categorias: categoria[] = [];

  constructor(
    private readonly categoriaService: CategoriasService,
    private readonly toastService: ToastService
  ) {}

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        this.toastService.error(
          'Erro interno !',
          'Erro ao listar categorias !'
        );
      },
    });
  }

  ngOnInit(): void {
    this.subscriber.add(
      this.listarCategorias()
    );
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
