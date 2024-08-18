import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import {
  FiltroUsuarioRequest,
  StatusUser,
  usuario,
} from '../../../../../../interfaces/usuario.model';
import { Subscriber } from 'rxjs';
import { UsuariosService } from '../../usuarios.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { ListComponent } from '../../../../../../../shared/table/list/list.component';
import { ChipsComponent } from '../../../../../../../shared/chips/chips.component';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [TableComponent, ListComponent, ChipsComponent],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss',
})
export class ListarUsuariosComponent implements OnInit, OnDestroy {
  subscription = new Subscriber();
  headers = ['ID', 'Nome', 'Email', 'Status', 'Tipo', 'Ações'];
  body: any[] = [];
  activeChip: string = 'Todos';

  pagina: number = 0;
  tamanhoPagina: number = 10;

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

  listarUsuarios() {
    this.subscription.add(
      this.usuarioService.listarTodos(this.filtroUsuarioRequest).subscribe({
        next: (usuarios) => {
          this.body = usuarios.content;
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
