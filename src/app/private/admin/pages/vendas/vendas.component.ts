import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { CadastrarVendaComponent } from "./components/cadastrar-venda/cadastrar-venda.component";
import { ListarVendasComponent } from "./components/listar-vendas/listar-vendas.component";
import { VendasService } from './vendas.service';
import { valueBehavior } from '../../../../interfaces/valueBehavior.model';
import { ListarVendaPorIdComponent } from "./components/listar-venda-por-id/listar-venda-por-id.component";

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [TabsComponent, CadastrarVendaComponent, ListarVendasComponent, ListarVendaPorIdComponent],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.scss'
})
export class VendasComponent implements OnInit, OnDestroy {

  tabSelecionada: string = '';

  valueBehavior: valueBehavior = {
    idEntidade: null,
    labelComponent: null
  };

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService,
    private readonly vendaService: VendasService,
  ) {
    navbarService.setTitle('Vendas');
    menuService.setMenu({
      icon: 'storefront',
      label: 'Vendas',
      route: 'dashboard/vendas',
      checked: true,
    });
  }
  ngOnInit(): void {
    this.vendaService.abrirComponentVendaPorId.subscribe(value => {
      if(value.idEntidade != null && value.labelComponent != null) {
        this.valueBehavior = value;
      }
    })
  }

  ngOnDestroy(): void {
  }

  tabs: Tab[] = [
    { icon: 'add', label: 'Cadastrar Vendas', selected: true, value: 'cadastrar-vendas' },
    { icon: 'list', label: 'Listar Vendas', selected: false, value: 'listar-vendas' },
  ];

  retornarValorTab(event: any) {
    this.tabSelecionada = event;
    this.valueBehavior.idEntidade = null;
    this.valueBehavior.labelComponent = null;
    this.vendaService.abrirComponentVendaPorId.next(this.valueBehavior);
  }

}
