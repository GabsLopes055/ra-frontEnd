import { CommonModule } from '@angular/common';
import { ToastService } from './../../../../../../../shared/toast/toast.service';
import { VendasService } from './../../vendas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { FiltroDeBusca } from '../../../../../../interfaces/paginated.model';
import { filtroVenda, venda } from '../../../../../../interfaces/venda.model';

@Component({
  selector: 'app-listar-vendas',
  standalone: true,
  imports: [
    ButtonComponent,
    PaginatorComponent,
    ChipsComponent,
    TableComponent,
    CommonModule,
  ],
  templateUrl: './listar-vendas.component.html',
  styleUrl: './listar-vendas.component.scss',
})
export class ListarVendasComponent implements OnInit, OnDestroy {
  activeChip: string | null = null;
  headers: string[] = [
    'Data',
    'Total',
    'Metodo Pagamento',
    'Desconto',
    'Ações',
  ];

  vendas: venda[] = [];

  totalPages: number = 0;
  pagina: number = 0;
  tamanhoPagina: number = 10;

  filtroBusca: filtroVenda = {
    dataBusca: this.activeChip,
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
  };

  constructor(
    private readonly vendaService: VendasService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.listarTodasVendas();
  }
  ngOnDestroy(): void {}

  listarTodasVendas() {
    this.vendaService.listarTodasAsVendas(this.filtroBusca).subscribe({
      next: (venda) => {
        this.totalPages = venda.totalElements;
        this.vendas = venda.content.flat();
      },
      error: (error) => {
        this.toastService.error('Erro interno !', 'Erro ao listar as vendas !');
      },
    });
  }

  alterarChip(chip: string | null) {
    this.activeChip = chip;
    this.filtroBusca.dataBusca = chip;
    this.listarTodasVendas();
  }

  passarPaginas(pagina: number) {
    this.filtroBusca.pagina = pagina;
    this.listarTodasVendas();
  }
}
