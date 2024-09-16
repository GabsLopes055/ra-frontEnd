import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  InputComponent,
  optionsInput,
} from '../../../../../../../shared/input/input.component';
import { ProdutosService } from '../../../produtos/produtos.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  filtroDeBuscaProduto,
  produtos,
} from '../../../../../../interfaces/produtos.model';
import { debounce, debounceTime, Subscriber } from 'rxjs';
import { InputSelectComponent } from '../../../../../../../shared/input-select/input-select.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectComponent } from '../../../../../../../shared/select/select.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';

@Component({
  selector: 'app-cadastrar-venda',
  standalone: true,
  imports: [
    InputComponent,
    InputSelectComponent,
    SelectComponent,
    ButtonComponent,
    TableComponent,
  ],
  templateUrl: './cadastrar-venda.component.html',
  styleUrl: './cadastrar-venda.component.scss',
})
export class CadastrarVendaComponent implements OnInit, OnDestroy {

  headers = ['Nome', 'Venda', 'Custo', 'Ações'];
  produtosSelecionados: produtos[] = [];
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

  optionsPermissao: optionsInput[] = [
    { label: 'Selecione a forma de Pagamento', value: '' },
    { label: 'Crédito', value: 'CREDITO' },
    { label: 'Débito', value: 'DEBITO' },
    { label: 'Pix', value: 'PIX' },
    { label: 'Dinheiro', value: 'DINHEIRO' },
  ];

  formVenda = new FormGroup({
    produto: new FormControl(),
    metodoPagamento: new FormControl(),
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

  removerProdutoDaLista(excluir: produtos) {
    this.produtosSelecionados.forEach((produto) => {
      if(produto.idProduto == excluir.idProduto) {
        console.log("são iguais")
        // console.log(this.produtosSelecionados.keys)

        // this.produtosSelecionados.splice(, 1);
      }
    })
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
    // this.formVenda.controls.quantidade.valueChanges
    //   .pipe(debounceTime(100))
    //   .subscribe(() => {
    //     const quantidade = this.formVenda.controls.quantidade.value;
    //     const precoVenda = this.formVenda.controls.metodoPagamento.value;
    //     if (quantidade !== null && precoVenda !== null) {
    //       this.formVenda.controls.total.setValue(quantidade * precoVenda);
    //       this.totalVenda = quantidade * precoVenda
    //     }
    //   });
  }

  produtoSelecionado(produto: produtos) {
    this.produtosSelecionados.push(produto);
    // this.formVenda.controls.precoVenda.setValue(produto.precoVenda);
    // this.formVenda.controls.total.setValue(produto.precoVenda);
    // this.formVenda.controls.quantidade.setValue(1);
    console.log(this.produtosSelecionados);
  }
}
