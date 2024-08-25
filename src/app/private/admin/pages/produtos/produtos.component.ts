import { Component } from '@angular/core';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { Tab, TabsComponent } from "../../../../../shared/tabs/tabs.component";
import { ListarProdutosComponent } from "./components/listar-produtos/listar-produtos.component";
import { CadastrarProdutosComponent } from "./components/cadastrar-produtos/cadastrar-produtos.component";

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [TabsComponent, ListarProdutosComponent, CadastrarProdutosComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  tabSelecionada: string = '';

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService
  ) {
    navbarService.setTitle('Produtos');
    menuService.setMenu({
      icon: 'person',
      label: 'Produtos',
      route: '/produtos',
      checked: true,
    });
  }

  tabs: Tab[] = [
    { icon: 'list', label: 'Listar Produtos', selected: true, value: 'listar-produtos' },
    { icon: 'add', label: 'Cadastrar Produtos', selected: false, value: 'cadastrar-produtos' },
    { icon: 'inventory_2', label: 'Produtos no estoque', selected: false, value: 'produtos-estoque' },
  ];

  retornarValorTab(event: any) {
    this.tabSelecionada = event
  }

}
