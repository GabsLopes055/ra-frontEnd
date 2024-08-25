import { Subscriber } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from "../../../../../../../shared/table/table.component";
import { PaginatorComponent } from "../../../../../../../shared/paginator/paginator.component";
import { produtos } from '../../../../../../interfaces/produtos.model';
import { ProdutosService } from '../../produtos.service';
import { ButtonComponent } from "../../../../../../../shared/button/button.component";
import { ChipsComponent } from "../../../../../../../shared/chips/chips.component";
import { ToastService } from '../../../../../../../shared/toast/toast.service';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [TableComponent, PaginatorComponent, ButtonComponent, ChipsComponent],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss'
})
export class ListarProdutosComponent implements OnInit, OnDestroy {

  subscriber = new Subscriber();
  activeChip: string = 'Todos';
  totalPages!: number;
  headers = ['Nome', 'Venda', 'Custo', 'Quantidade', 'Categoria', 'Ações'];
  body: produtos[] = [];

  constructor(
    private readonly produtosService: ProdutosService,
    private readonly toastService: ToastService
  ){}

  ngOnInit(): void {
    this.subscriber.add(
      this.listarProdutos()
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  listarProdutos() {
    this.produtosService.listarProdutos().subscribe({
      next: (produtos) => {
        this.body = produtos
      },
      error: (error) => {
        this.toastService.error("Erro Interno", "Erro ao listar Produtos !")
      }
    })
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
    // this.filtroUsuarioRequest.pagina = pagina;
    // console.log(pagina)
    // this.listarUsuarios();
  }

}
