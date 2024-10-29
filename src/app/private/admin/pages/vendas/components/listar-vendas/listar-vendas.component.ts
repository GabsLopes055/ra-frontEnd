import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';
import { DateComponent } from '../../../../../../../shared/date/date.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { filtroVenda, venda } from '../../../../../../interfaces/venda.model';
import { VendasService } from '../../vendas.service';
import { valueBehavior } from '../../../../../../interfaces/valueBehavior.model';

@Component({
  selector: 'app-listar-vendas',
  standalone: true,
  imports: [
    ButtonComponent,
    PaginatorComponent,
    ChipsComponent,
    TableComponent,
    CommonModule,
    DateComponent,
  ],
  templateUrl: './listar-vendas.component.html',
  styleUrl: './listar-vendas.component.scss',
})
export class ListarVendasComponent implements OnInit, OnDestroy {

  activeChip: string | null = null;
  dataInicio: Date = new Date();
  dataFim: Date = new Date();

  headers: string[] = [
    'Data',
    'Total',
    'Metodo Pagamento',
    'Desconto',
    'Ações',
  ];

  vendas: venda[] = [];

  valueBehavior: valueBehavior = {
    idEntidade: null,
    labelComponent: null
  };

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  filtroBusca: filtroVenda = {
    dataInicio: this.dataInicio,
    dataFim: this.dataFim,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly vendaService: VendasService,
    private readonly toastService: ToastService
  ) {
    this.dataInicio = new Date(this.dataInicio.toISOString());
    this.dataFim = new Date(this.dataFim.toISOString());
  }

  ngOnInit(): void {
    this.filtroBusca.dataInicio = new Date(new Date().setHours(0, 0, 0, 0));
    this.filtroBusca.dataFim = new Date(new Date().setHours(0, 0, 0, 0));
    this.listarTodasVendas();
  }
  ngOnDestroy(): void {}

  listarTodasVendas() {
    this.vendaService.listarTodasAsVendas(this.filtroBusca).subscribe({
      next: (venda) => {
        this.totalPages = venda.totalPages;
        this.vendas = venda.content.flat();
      },
      error: (error) => {
        this.toastService.error('Erro interno !', 'Erro ao listar as vendas !');
      },
    });
  }

  alterarChip(chip: string | null) {
    this.activeChip = chip;

    if (chip === null) {
      this.filtroBusca.dataInicio = new Date(new Date().setHours(0, 0, 0, 0));
      this.filtroBusca.dataFim = new Date(new Date().setHours(0, 0, 0, 0));
    } else if (chip === '7') {
      this.filtroBusca.dataInicio.setDate(this.dataInicio.getDate() - 7);
    } else if (chip === '15') {
      this.filtroBusca.dataInicio.setDate(this.dataInicio.getDate() - 15);
    } else if (chip === 'Ultimo Mês') {
      this.filtroBusca.dataInicio.setMonth(this.dataInicio.getMonth() - 1);
    } else {
      this.filtroBusca.dataInicio.setYear(this.dataInicio.getFullYear() - 10);
    }

    this.filtroBusca.pagina = 0;
    this.totalPages = 0;
    this.pagina = 0;

    this.listarTodasVendas();
  }

  retornarData(event: Date) {
    this.activeChip = 'selecionarDatas';
    this.filtroBusca.dataInicio = event.toISOString();
    this.listarTodasVendas();
  }

  passarPaginas(pagina: number) {
    this.filtroBusca.pagina = pagina;
    this.listarTodasVendas();
  }

  abrirComponentVendasPorId(idVenda: string | null) {
    this.valueBehavior = {
      idEntidade: idVenda,
      labelComponent: 'app-listar-venda-por-id'
    };
    this.vendaService.abrirComponentVendaPorId.next(this.valueBehavior);
  }

  retornaMetodoDePagamento(metodo: string | null): string | null {

    let metodoRetorno = metodo;

    if(metodo === 'PIX') metodoRetorno = 'Pix'
    if(metodo === 'DINHEIRO') metodoRetorno = 'Dinheiro'
    if(metodo === 'CREDITO') metodoRetorno = 'Crédito'
    if(metodo === 'DEBITO') metodoRetorno = 'Débito'


    return metodoRetorno;

  }
}
