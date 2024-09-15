import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, Subscriber } from 'rxjs';

import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { InputSelectComponent } from '../../../../../../../shared/input-select/input-select.component';
import {
  InputComponent,
  optionsInput,
} from '../../../../../../../shared/input/input.component';
import { SelectComponent } from '../../../../../../../shared/select/select.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  filtroDeBuscaProduto,
  produtos,
} from '../../../../../../interfaces/produtos.model';
import { ProdutosService } from '../../../produtos/produtos.service';
import { CommonModule } from '@angular/common';

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

  constructor() {}

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

    console.log(this.formVenda.value);
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
    this.totalVenda = this.produtosSelecionados.reduce((acumulador, produto) => acumulador + produto.precoVenda, 0);
    this.formVenda.controls.totalVenda.setValue(this.totalVenda);

    // Atualiza o valor com desconto aplicado
    this.atualizarTotalComDesconto(this.formVenda.controls.desconto.value || 0);
  }
}
