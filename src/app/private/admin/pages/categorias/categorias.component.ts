import { Subscriber } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { ListarCategoriasComponent } from "./components/listar-categorias/listar-categorias.component";
import { CadastrarCategoriaComponent } from "./components/cadastrar-categoria/cadastrar-categoria.component";
import { CategoriasService } from './categorias.service';
import { ProdutosCategoriaComponent } from "./components/produtos-categoria/produtos-categoria.component";
import { EditarCategoriaComponent } from "./components/editar-categoria/editar-categoria.component";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [TabsComponent, ListarCategoriasComponent, CadastrarCategoriaComponent, ProdutosCategoriaComponent, EditarCategoriaComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit, OnDestroy{

  tabSelecionada: string = '';
  subscriber = new Subscriber();

  mostrarComponent: string = '';
  idCategoria: any;

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService,
    private readonly categoriaService: CategoriasService
  ) {
    navbarService.setTitle('Categorias');
    menuService.setMenu({
      icon: 'person',
      label: 'Categorias',
      route: '/categorias',
      checked: true,
    });

    this.categoriaService.listarProdutosDaCategoria.subscribe((value) => {
      if(value != null) {
        this.mostrarComponent = value.labelComponent;
        this.idCategoria = value.idEntidade;
      }
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  tabs: Tab[] = [
    { icon: 'list', label: 'Listar Categorias', selected: true, value: 'listar-categorias' },
    { icon: 'add', label: 'Cadastrar Categoria', selected: false, value: 'cadastrar-categoria' },
  ];

  retornarValorTab(event: any) {
    this.mostrarComponent = 'app-listar-categorias';
    this.categoriaService.listarProdutosDaCategoria.next(null);
    this.tabSelecionada = event
  }
}
