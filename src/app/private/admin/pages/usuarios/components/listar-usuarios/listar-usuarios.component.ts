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
  usuario,
} from '../../../../../../interfaces/usuario.model';
import { UsuariosService } from '../../usuarios.service';
import { optionsInput } from '../../../../../../../shared/input/input.component';
import { StatusComponent } from '../../../../../../../shared/status/status.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ModalComponent } from '../../../../../../../shared/modal-excluir/modal.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    TableComponent,
    ListComponent,
    ChipsComponent,
    PaginatorComponent,
    StatusComponent,
    ButtonComponent,
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss',
})
export class ListarUsuariosComponent implements OnInit, OnDestroy {
  subscription = new Subscriber();
  headers = ['Nome', 'Email', 'Status', 'Tipo', 'Ações'];
  body: usuario[] = [];
  activeChip: string = 'Todos';

  overlayRef!: OverlayRef;

  totalPages!: number;
  pagina: number = 0;
  tamanhoPagina: number = 5;

  filtroUsuarioRequest: FiltroUsuarioRequest = {
    pagina: this.pagina,
    tamanhoPagina: this.tamanhoPagina,
    statusUser: null,
    nomeCompleto: null,
    email: null,
    role: null,
  };


  constructor(
    private readonly overlay: Overlay,
    private readonly usuarioService: UsuariosService,
    private readonly toastService: ToastService
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
    this.listarUsuarios();
  }

  abrirModalDesativarUsuario(userId: string) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      disposeOnNavigation: true,
    });

    const modalExclusao = new ComponentPortal<ModalComponent>(ModalComponent);

    const modalConfirmacao = this.overlayRef.attach(modalExclusao);

    const modal = modalConfirmacao.instance as ModalComponent;

    modal.texto = "Deseja realmente desativar este usuario ?";
    // modal.subTexto = "Certifique-se de que não tenha nenhum produto vinculado a esta categoria !";

    modal.cancelar.subscribe(() => {
      this.closeModal();
    });

    modal.confirmar.subscribe(() => {
      this.desativarUsuario(userId);
    });
    // this.overlayRef.keydownEvents().subscribe(() => this.closeModal());
  }

  desativarUsuario(userId: string) {

    this.usuarioService.desativarUsuario(userId).subscribe({
      next: (string) => {
        this.closeModal();
        this.toastService.success("Sucesso", "Usuário desativado com sucesso !");
      }
    })


  }

  closeModal() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.listarUsuarios();
    }
  }

  listarUsuarios() {
    this.subscription.add(
      this.usuarioService.listarTodos(this.filtroUsuarioRequest).subscribe({
        next: (usuarios) => {
          this.body = usuarios.content.flat();
          this.totalPages = usuarios.totalPages;
        },
        error: (error) => {
          console.log(error);
          this.toastService.error('Erro interno !', 'Erro ao listar usuários !');
        },
      })
    );
  }

  retornarPermissao(role: string): string {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'MANAGER':
        return 'Gerente';
      case 'SUPPORT':
        return 'Suporte';
      case 'USER':
        return 'Usuário';
      default:
        return '';
    }
  }

  // protected readonly statusUsuario = StatusUser
}
