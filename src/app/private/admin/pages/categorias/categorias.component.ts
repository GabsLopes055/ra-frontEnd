import { Subscriber } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { MenuService } from '../../../../../shared/menu/menu.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { ListarCategoriasComponent } from "./components/listar-categorias/listar-categorias.component";
import { CadastrarCategoriaComponent } from "./components/cadastrar-categoria/cadastrar-categoria.component";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [TabsComponent, ListarCategoriasComponent, CadastrarCategoriaComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit, OnDestroy{

  tabSelecionada: string = '';
  subscriber = new Subscriber();

  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService
  ) {
    navbarService.setTitle('Categorias');
    menuService.setMenu({
      icon: 'person',
      label: 'Categorias',
      route: '/categorias',
      checked: true,
    });
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
    this.tabSelecionada = event
  }
}
