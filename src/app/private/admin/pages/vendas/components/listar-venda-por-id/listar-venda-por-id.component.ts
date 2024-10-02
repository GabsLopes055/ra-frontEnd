import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { VendasService } from '../../vendas.service';
import { venda } from './../../../../../../interfaces/venda.model';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';

@Component({
  selector: 'app-listar-venda-por-id',
  standalone: true,
  imports: [TableComponent, CommonModule, ChipsComponent],
  templateUrl: './listar-venda-por-id.component.html',
  styleUrl: './listar-venda-por-id.component.scss',
})
export class ListarVendaPorIdComponent implements OnInit, OnDestroy {
  @Input() idVenda: string | null = '';

  venda!: venda;
  headers = ['Nome', 'Venda', 'Custo'];

  constructor(
    private readonly vendasService: VendasService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.vendasService.buscarVendaPorId(this.idVenda as string).subscribe({
      next: (value) => {
        this.venda = value;
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnDestroy(): void {}

  retornaMetodoDePagamento(metodo: string | null): string | null {

    let metodoRetorno = metodo;

    if(metodo === 'PIX') metodoRetorno = 'Pix'
    if(metodo === 'DINHEIRO') metodoRetorno = 'Dinheiro'
    if(metodo === 'CREDITO') metodoRetorno = 'Crédito'
    if(metodo === 'DEBITO') metodoRetorno = 'Débito'


    return metodoRetorno;

  }
}
