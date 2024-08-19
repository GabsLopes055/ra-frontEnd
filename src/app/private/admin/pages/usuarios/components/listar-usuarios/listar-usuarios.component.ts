import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';
import { PaginatorComponent } from '../../../../../../../shared/paginator/paginator.component';
import { ListComponent } from '../../../../../../../shared/table/list/list.component';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import {
  FiltroUsuarioRequest,
  StatusUser,
} from '../../../../../../interfaces/usuario.model';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [TableComponent, ListComponent, ChipsComponent, PaginatorComponent],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss',
})
export class ListarUsuariosComponent implements OnInit, OnDestroy {
  subscription = new Subscriber();
  headers = ['ID', 'Nome', 'Email', 'Status', 'Tipo', 'Ações'];
  body: any[] = [];
  activeChip: string = 'Todos';

  totalPages!: number;
  pagina: number = 0;
  tamanhoPagina: number = 3;

  filtroUsuarioRequest: FiltroUsuarioRequest = {
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
    statusUser: null,
    nomeCompleto: null,
    email: null,
    role: null,
  };
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly toast: ToastService
  ) {}

  alterarChip(chip: string) {
    this.activeChip = chip;

    if (chip == 'Ativos') {
      this.filtroUsuarioRequest.statusUser = StatusUser.ATIVO;
    } else if (chip == 'Inativos') {
      this.filtroUsuarioRequest.statusUser = StatusUser.INATIVO;
    } else {
      this.filtroUsuarioRequest.statusUser = null;
    }
    this.listarUsuarios();
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  passarPaginas(pagina: number) {
    this.filtroUsuarioRequest.pagina = pagina;
    console.log(pagina)
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.subscription.add(
      this.usuarioService.listarTodos(this.filtroUsuarioRequest).subscribe({
        next: (usuarios) => {
          this.body = usuarios.content;
          this.totalPages = usuarios.totalPages;
        },
        error: (error) => {
          console.log(error);
          this.toast.error('Erro interno !', 'Erro ao listar usuários !');
        },
      })
    );
  }

  // protected readonly statusUsuario = StatusUser
}
