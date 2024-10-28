import { ProdutosService } from './produtos.service';
import { produtoRequest } from './../../../../interfaces/produtos.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { Tab, TabsComponent } from "../../../../../shared/tabs/tabs.component";
import { ListarProdutosComponent } from "./components/listar-produtos/listar-produtos.component";
import { CadastrarProdutosComponent } from "./components/cadastrar-produtos/cadastrar-produtos.component";
import { EditarProdutoComponent } from "./components/editar-produto/editar-produto.component";

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [TabsComponent, ListarProdutosComponent, CadastrarProdutosComponent, EditarProdutoComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  tabSelecionada: string = '';

  mostrarComponent: string | null = '';
  idProduto: string | null = '';

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService,
    private readonly produtoService: ProdutosService
  ) {
    navbarService.setTitle('Produtos');
    menuService.setMenu({
      icon: 'person',
      label: 'Produtos',
      route: '/produtos',
      checked: true,
    });

    this.produtoService.behaviorProduto.subscribe((value) => {
      if(value != null) {
        this.idProduto = value.idEntidade;
        this.mostrarComponent = value.labelComponent;
      }
    })

  }

  tabs: Tab[] = [
    { icon: 'list', label: 'Listar Produtos', selected: true, value: 'listar-produtos' },
    { icon: 'add', label: 'Cadastrar Produtos', selected: false, value: 'cadastrar-produtos' },
    { icon: 'inventory_2', label: 'Produtos no estoque', selected: false, value: 'produtos-estoque' },
  ];

  retornarValorTab(event: any) {
    this.mostrarComponent = 'app-produtos';
    // this.produtoService.behaviorProduto.next({idEntidade: null, labelComponent: null});
    this.tabSelecionada = event;
  }

}
