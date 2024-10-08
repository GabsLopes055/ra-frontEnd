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
import { PaginatorComponent } from "../../../../../shared/paginator/paginator.component";
import { EditarUsuarioComponent } from "./components/editar-usuario/editar-usuario.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent, TabsComponent, ListarUsuariosComponent, CadastrarUsuarioComponent, PaginatorComponent, EditarUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit{


  tabSelecionada: string = '';

  userId: string = '';


  tabs: Tab[] = [
    { icon: 'list', label: 'Listar Usuarios', selected: true, value: 'listar-usuarios' },
    { icon: 'add', label: 'Cadastrar Usuarios', selected: false, value: 'cadastrar-usuarios' },
  ];



  constructor(
    private readonly navbarService: NavbarService,
    private readonly menuService: MenuService,
    private readonly usuarioService: UsuariosService
  ) {
    navbarService.setTitle('Usuarios');
    menuService.setMenu({
      icon: 'person',
      label: 'Usuarios',
      route: '/usuarios',
      checked: true,
    });
  }

  ngOnInit(): void {
    this.usuarioService.editarUsuario.subscribe(value => {
      if(value != null) {
        this.tabSelecionada = value.label;
        this.userId = value.value;
      }
    })
  }

  retornarValorTab(event: any) {
    this.tabSelecionada = event
  }


}
