import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../../../../../../../shared/input/input.component';
import { ProdutosService } from '../../../produtos/produtos.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  filtroDeBuscaProduto,
  produtos,
} from '../../../../../../interfaces/produtos.model';
import { debounce, debounceTime, Subscriber } from 'rxjs';
import { InputSelectComponent } from '../../../../../../../shared/input-select/input-select.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-venda',
  standalone: true,
  imports: [InputComponent, InputSelectComponent],
  templateUrl: './cadastrar-venda.component.html',
  styleUrl: './cadastrar-venda.component.scss',
})
export class CadastrarVendaComponent implements OnInit, OnDestroy {
  totalVenda!: number;

  subscriber = new Subscriber();

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 100;

  filtroBusca: filtroDeBuscaProduto = {
    tipoProduto: null,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  formVenda = new FormGroup({
    produto: new FormControl(),
    precoVenda: new FormControl(),
    quantidade: new FormControl(),
    total: new FormControl(),
  });

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subscriber.add(this.listarProdutos());
    this.mudarValorTotal();
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

  mudarValorTotal() {
    this.formVenda.controls.quantidade.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
        const quantidade = this.formVenda.controls.quantidade.value;
        const precoVenda = this.formVenda.controls.precoVenda.value;

        if (quantidade !== null && precoVenda !== null) {
          this.formVenda.controls.total.setValue(quantidade * precoVenda);
          this.totalVenda = quantidade * precoVenda
        }
      });
  }

  produtoSelecionado(produto: produtos) {
    this.formVenda.controls.precoVenda.setValue(produto.precoVenda);
    this.formVenda.controls.total.setValue(produto.precoVenda);
    this.formVenda.controls.quantidade.setValue(1);
    console.log(produto);
  }
}
