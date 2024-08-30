import { Subscriber } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import {
  filtroDeBuscaProduto,
  produtos,
} from '../../../../../../interfaces/produtos.model';
import { ProdutosService } from '../../produtos.service';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { FiltroDeBusca } from '../../../../../../interfaces/paginated.model';
import { Overlay } from '@angular/cdk/overlay';
import { OverlayRef } from 'ngx-toastr';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [
    TableComponent,
    PaginatorComponent,
    ButtonComponent,
    ChipsComponent
  ],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss',
})
export class ListarProdutosComponent implements OnInit, OnDestroy {
  subscriber = new Subscriber();
  activeChip: string | null = null;

  headers = ['Nome', 'Venda', 'Custo', 'Quantidade', 'Categoria', 'Ações'];
  body: any[] = [];

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  filtroBusca: filtroDeBuscaProduto = {
    tipoProduto: null,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
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
    console.log(this.filtroBusca)
    this.produtosService.listarProdutos(this.filtroBusca).subscribe({
      next: (produtos) => {
        this.body = produtos.content;
        this.totalPages = produtos.totalPages
      },
      error: (error) => {
        this.toastService.error('Erro Interno', 'Erro ao listar Produtos !');
      },
    });
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
