import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { DividerComponent } from '../../../../../shared/divider/divider.component';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { ListComponent } from '../../../../../shared/table/list/list.component';
import { TableComponent } from '../../../../../shared/table/table.component';
import { TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { filtroVenda, venda } from '../../../../interfaces/venda.model';
import { VendasService } from '../vendas/vendas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TabsComponent,
    TableComponent,
    ListComponent,
    DividerComponent,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  vendas: venda[] = [];
  total: any;
  dataHoje: any = new Date().toISOString();


  filtroBusca: filtroVenda = {
    dataInicio: new Date(new Date().setHours(0, 0, 0, 0)),
    dataFim: new Date(new Date().setHours(0, 0, 0, 0)),
    pagina: 0,
    tamanhoPagina: 50,
  };

  constructor(
    private readonly menuService: MenuService,
    private readonly navbarService: NavbarService,
    private readonly vendasService: VendasService,
    private readonly toastService: ToastrService
  ) {
    this.menuService.setMenu({
      icon: 'dashboard',
      label: 'Dashboard',
      route: '',
      checked: true,
    });
    this.navbarService.setTitle('Dashboard');
  }
  ngOnInit(): void {
    this.listarVendasHoje();
  }

  listarVendasHoje() {
    this.vendasService.listarTodasAsVendas(this.filtroBusca).subscribe({
      next: (vendas) => {
        this.vendas = vendas.content.flat();
        this.total = this.vendas.reduce((acc, venda) => acc + venda.totalVenda, 0);
      },
      error: () => {
        this.toastService.error("Erro ao listar Vendas", "Erro Interno !")
      }
    });
  }

  formaPagamento(value: string | null): string {
    const formasPagamento: { [key: string]: string } = {
      CREDITO: 'Crédito',
      DEBITO: 'Débito',
      PIX: 'Pix',
      DINHEIRO: 'Dinheiro',
    };

    return formasPagamento[value || ''];
  }
}
