import { Component } from '@angular/core';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { CadastrarVendaComponent } from "./components/cadastrar-venda/cadastrar-venda.component";

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [TabsComponent, CadastrarVendaComponent],
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.scss'
})
export class VendasComponent {

  tabSelecionada: string = '';

  mostrarComponent: string = '';
  idProduto: string = '';

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService
  ) {
    navbarService.setTitle('Vendas');
    menuService.setMenu({
      icon: 'storefront',
      label: 'Vendas',
      route: 'dashboard/vendas',
      checked: true,
    });
  }

  tabs: Tab[] = [
    { icon: 'add', label: 'Cadastrar Vendas', selected: true, value: 'cadastrar-vendas' },
    { icon: 'list', label: 'Listar Vendas', selected: false, value: 'listar-vendas' },
  ];

  retornarValorTab(event: any) {
    this.tabSelecionada = event;
  }

}
