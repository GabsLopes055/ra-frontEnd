import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from "../../../../../../../shared/input/input.component";
import { ProdutosService } from '../../../produtos/produtos.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { filtroDeBuscaProduto } from '../../../../../../interfaces/produtos.model';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-cadastrar-venda',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './cadastrar-venda.component.html',
  styleUrl: './cadastrar-venda.component.scss'
})
export class CadastrarVendaComponent implements OnInit, OnDestroy {

  subscriber = new Subscriber();

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 100;

  filtroBusca: filtroDeBuscaProduto = {
    tipoProduto: null,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subscriber.add(this.listarProdutos());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  listarProdutos() {
    this.produtoService.listarProdutos(this.filtroBusca).subscribe({
      next: (produtos) => {
        // this.body = produtos.content.flat();
        // this.totalPages = produtos.totalPages;
      },
      error: (error) => {
        this.toastService.error('Erro Interno', 'Erro ao listar Produtos !');
      },
    });
  }




}
