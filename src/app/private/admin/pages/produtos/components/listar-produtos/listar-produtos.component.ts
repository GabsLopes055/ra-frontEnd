import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  filtroDeBuscaProduto,
  produtos,
} from '../../../../../../interfaces/produtos.model';
import { ProdutosService } from '../../produtos.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../../../../../../../shared/modal-excluir/modal.component';
import { valueBehavior } from '../../../../../../interfaces/valueBehavior.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [
    TableComponent,
    PaginatorComponent,
    ButtonComponent,
    ChipsComponent,
    CommonModule
  ],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss',
})
export class ListarProdutosComponent implements OnInit, OnDestroy {

  subscriber = new Subscriber();
  overlayRef!: OverlayRef;
  activeChip: string | null = null;

  headers = ['Nome', 'Venda', 'Custo', 'Quantidade', 'Categoria', 'Ações'];
  body: produtos[] = [];

  passarValor!: valueBehavior;

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  filtroBusca: filtroDeBuscaProduto = {
    tipoProduto: null,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly overlay: Overlay,
    private readonly produtosService: ProdutosService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subscriber.add(this.listarProdutos());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  listarProdutos() {
    this.produtosService.listarProdutos(this.filtroBusca).subscribe({
      next: (produtos) => {
        this.body = produtos.content.flat();
        this.totalPages = produtos.totalPages;
      },
      error: (error) => {
        this.toastService.error('Erro Interno', 'Erro ao listar Produtos !');
      },
    });
  }

  abrirModalDeletarProduto(idProduto: string | null) {
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

    modal.texto = 'Deseja realmente excluir este produto ?';
    // modal.subTexto = "Certifique-se de que não tenha nenhum produto vinculado a esta categoria !";

    modal.cancelar.subscribe(() => {
      this.closeModal();
    });

    modal.confirmar.subscribe(() => {
      this.excluirProduto(idProduto);
    });
  }

  editarProduto(idProduto: string | null) {

    this.passarValor = {
      idEntidade: idProduto,
      labelComponent: 'app-editar-produto'
    };

    this.produtosService.behaviorProduto.next(this.passarValor);

  }

  excluirProduto(idProduto: string | null) {
    this.produtosService.excluirProduto(idProduto).subscribe({
      next: (value) => {
        this.toastService.success('Sucesso', 'Produto deletado !');
        this.closeModal();
      },
      error: (error) => {
        this.closeModal();
        this.toastService.error('Erro Interno !', 'Erro ao excluir produto !');
      },
    });
  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.listarProdutos();
    }
  }

  alterarChip(chip: string | null) {
    this.activeChip = chip;
    this.filtroBusca.tipoProduto = chip;
    this.listarProdutos();
  }

  passarPaginas(pagina: number) {
    this.filtroBusca.pagina = pagina;
    this.listarProdutos();
  }
}
