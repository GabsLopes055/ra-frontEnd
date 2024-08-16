import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

import { MenuService } from '../../../../../shared/menu/menu.service';
import { NavbarService } from '../../../../../shared/navbar/navbar.service';
import { TableComponent } from '../../../../../shared/table/table.component';
import { ToastService } from '../../../../../shared/toast/toast.service';
import { usuario } from '../../../../interfaces/usuario.model';
import { UsuariosService } from './usuarios.service';
import { Tab, TabsComponent } from '../../../../../shared/tabs/tabs.component';
import { ListarUsuariosComponent } from "./components/listar-usuarios/listar-usuarios.component";
import { CadastrarUsuarioComponent } from "./components/cadastrar-usuarios/cadastrar-usuario.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent, TabsComponent, ListarUsuariosComponent, CadastrarUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent{


  tabSelecionada: string = '';


  tabs: Tab[] = [
    { icon: 'list', label: 'Listar Usuarios', selected: true, value: 'listar-usuarios' },
    { icon: 'add', label: 'Cadastrar Usuarios', selected: false, value: 'cadastrar-usuarios' },
  ];



  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService
  ) {
    navbarService.setTitle('Usuarios');
    menuService.setMenu({
      icon: 'person',
      label: 'Usuarios',
      route: '/usuarios',
      checked: true,
    });
  }

  retornarValorTab(event: any) {
    this.tabSelecionada = event
  }


}
