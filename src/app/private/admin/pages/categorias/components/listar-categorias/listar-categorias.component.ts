import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ModalComponent } from '../../../../../../../shared/modal-excluir/modal.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { FiltroDeBusca } from '../../../../../../interfaces/paginated.model';
import { CategoriasService } from '../../categorias.service';

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
  passarValores!: valuesCategoria;

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  overlayRef!: OverlayRef;

  filtro: FiltroDeBusca = {
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly overlay: Overlay,
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

    this.passarValores = {
      idCategoria: idCategoria,
      labelComponent: 'listar-produtos-categoria',
    };

    this.categoriaService.listarProdutosDaCategoria.next(this.passarValores);
  }

  abrirModalExclusao(idCategoria: string) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      disposeOnNavigation: true,
    });

    const modalExclusao = new ComponentPortal<ModalComponent>(ModalComponent);

    const modalConfirmacao = this.overlayRef.attach(modalExclusao);

    const modal = modalConfirmacao.instance as ModalComponent;

    modal.texto = "Deseja realmente excluir esta categoria ?";
    modal.subTexto = "Certifique-se de que não tenha nenhum produto vinculado a esta categoria !";

    modal.cancelar.subscribe(() => {
      this.closeModal();
    });

    modal.confirmar.subscribe(() => {
      this.excluirCategoria(idCategoria);
    });
  }

  excluirCategoria(idCategoria: string) {
    this.categoriaService.excluirCategoria(idCategoria).subscribe({
      next: (value) => {
        this.toastService.success('Sucesso', 'Categoria deletada');
        this.closeModal();
      },
      error: (error) => {
        this.toastService.error(error.error.mensagem, error.error.error);
      },
    });
  }

  editarCategoria(idCategoria: string) {
    this.passarValores = {
      idCategoria: idCategoria,
      labelComponent: 'editar-categoria',
    };

    this.categoriaService.listarProdutosDaCategoria.next(this.passarValores);
  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.listarCategorias();
    }
  }

  passarPaginas(pagina: number) {
    this.filtro.pagina = pagina;
    this.listarCategorias();
  }

  // @HostListener('document:keydown.escape', ['$event'])
  // onEsc(event: KeyboardEvent) {
  //   this.closeModal();
  // }

  ngOnInit(): void {
    this.subscriber.add(this.listarCategorias());
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
export interface valuesCategoria {
  idCategoria: string;
  labelComponent: string;
}
