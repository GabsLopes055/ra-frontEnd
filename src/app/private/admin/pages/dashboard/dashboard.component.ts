import { usuario } from './../../../../interfaces/usuario.model';
import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { ListComponent } from '../../../../../shared/table/list/list.component';
import { TableComponent } from '../../../../../shared/table/table.component';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { ToastrService } from 'ngx-toastr';
import { filtroVenda, venda } from '../../../../interfaces/venda.model';
import { VendasService } from '../vendas/vendas.service';
import { DividerComponent } from "../../../../../shared/divider/divider.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabsComponent, TableComponent, ListComponent, DividerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  vendas: venda[] = [];

  filtroBusca: filtroVenda = {
    dataInicio: new Date(),
    dataFim: new Date(),
    pagina: 0,
    tamanhoPagina: 50,
  };

  constructor(
    private readonly menuService: MenuService,
    private readonly navbarService: NavbarService,
    private readonly vendasService: VendasService
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
        console.log(vendas.content)
        this.vendas = vendas.content.flat();
      }
    })
  }
}
