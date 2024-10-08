import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscriber } from 'rxjs';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { InputSelectComponent } from '../../../../../../../shared/input-select/input-select.component';
import { InputComponent, optionsInput } from '../../../../../../../shared/input/input.component';
import { SelectComponent } from '../../../../../../../shared/select/select.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { produtos } from '../../../../../../interfaces/produtos.model';
import { venda } from '../../../../../../interfaces/venda.model';
import { VendasService } from './../../vendas.service';

@Component({
  selector: 'app-cadastrar-venda',
  standalone: true,
  imports: [
    InputComponent,
    InputSelectComponent,
    SelectComponent,
    ButtonComponent,
    TableComponent,
    CommonModule,
  ],
  templateUrl: './cadastrar-venda.component.html',
  styleUrl: './cadastrar-venda.component.scss',
})
export class CadastrarVendaComponent implements OnInit, OnDestroy {

  headers = ['Nome', '', 'Venda', 'Custo', 'Ações'];
  produtosSelecionados: produtos[] = [];
  totalVenda: number = 0;
  totalComDesconto: number = 0;
  venda!: venda;


  subscriber = new Subscriber();

  optionsPermissao: optionsInput[] = [
    { label: 'Selecione a forma de Pagamento', value: '' },
    { label: 'Crédito', value: 'CREDITO' },
    { label: 'Débito', value: 'DEBITO' },
    { label: 'Pix', value: 'PIX' },
    { label: 'Dinheiro', value: 'DINHEIRO' },
  ];

  formVenda = new FormGroup({
    produtosVendidos: new FormControl('', [Validators.required]),
    totalVenda: new FormControl(),
    metodoPagamento: new FormControl('', [Validators.required]),
    status: new FormControl('CONCLUIDA'),
    desconto: new FormControl(),
  });

  constructor(
    private readonly vendasService: VendasService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.descontarValor();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  deletarProduto(produto: produtos) {
    const index: number = this.produtosSelecionados.indexOf(produto);

    if (index > -1) {
      this.produtosSelecionados.splice(index, 1);
      this.atualizarTotalVenda();
    }
  }

  salvarVenda() {
    // Verifica se há produtos selecionados e se o método de pagamento foi preenchido
    if (this.produtosSelecionados.length > 0 && this.formVenda.controls.metodoPagamento.value !== '') {
      // Preenchendo diretamente a variável venda
      const venda = {
        produtosVendidos: this.produtosSelecionados,
        totalVenda: this.formVenda.controls.totalVenda.value,
        metodoPagamento: this.formVenda.controls.metodoPagamento.value,
        status: this.formVenda.controls.status.value,
        desconto: this.formVenda.controls.desconto.value
      };

      console.log(venda)

      // Chamando o serviço de cadastro de venda
      this.vendasService.cadastrarVenda(venda as venda).subscribe({
        next: (venda) => {
          this.toastService.success("Sucesso !", "Venda Cadastrada com Sucesso !")
          this.formVenda.reset();
          this.formVenda.controls.produtosVendidos.setValue("");
          // this.formVenda.controls.metodoPagamento.setValue("");
          this.produtosSelecionados.length = 0;
        },
        error: (err) => {
          this.toastService.error("Erro interno !", "Erro ao cadastrar a venda !")
        }
      });
    } else {
      console.log('Erro: Selecione produtos e informe o método de pagamento.');
    }
  }



  descontarValor() {
    this.formVenda.controls.desconto.valueChanges.pipe(debounceTime(500)).subscribe((desconto) => {
      this.atualizarTotalComDesconto(desconto);
    });
  }

  atualizarTotalComDesconto(desconto: number) {
    if (desconto && desconto > 0 && desconto <= this.totalVenda) {
      this.totalComDesconto = this.totalVenda - desconto;
    } else {
      this.totalComDesconto = this.totalVenda;
    }

    this.formVenda.controls.totalVenda.setValue(this.totalComDesconto);

  }

  produtoSelecionado(produto: produtos) {
    this.produtosSelecionados.push(produto);
    this.atualizarTotalVenda();
  }

  atualizarTotalVenda() {
    this.totalVenda = this.produtosSelecionados.reduce((acumulador, produto) => acumulador + (produto.precoVenda || 0), 0);
    this.formVenda.controls.totalVenda.setValue(this.totalVenda);

    // Atualiza o valor com desconto aplicado
    this.atualizarTotalComDesconto(this.formVenda.controls.desconto.value || 0);
  }
}
