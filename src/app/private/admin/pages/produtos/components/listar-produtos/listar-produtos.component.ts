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

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [
    TableComponent,
    PaginatorComponent,
    ButtonComponent,
    ChipsComponent,
  ],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss',
})
export class ListarProdutosComponent implements OnInit, OnDestroy {
  subscriber = new Subscriber();
  activeChip: string = 'Todos';

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

  alterarChip(chip: string) {
    this.activeChip = chip;

    // if (chip == 'Ativos') {
    //   this.filtroUsuarioRequest.statusUser = StatusUser.ATIVO;
    // } else if (chip == 'Inativos') {
    //   this.filtroUsuarioRequest.statusUser = StatusUser.INATIVO;
    // } else {
    //   this.filtroUsuarioRequest.statusUser = null;
    // }
    this.listarProdutos();
  }

  passarPaginas(pagina: number) {
    this.filtroBusca.pagina = pagina;
    this.listarProdutos();
  }
}
