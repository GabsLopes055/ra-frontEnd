import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from '../../../../../../../shared/table/table.component';
import { usuario } from '../../../../../../interfaces/usuario.model';
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
  body: usuario[] = [];
  activeChip: string = 'Todos';

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly toast: ToastService
  ) {}

  alterarChip(chip: string) {
    this.activeChip = chip;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.usuarioService.listarTodos().subscribe({
        next: (usuarios) => {
          this.body = usuarios;
        },
        error: (error) => {
          console.log(error);
          this.toast.error('Erro interno !', 'Erro ao listar usuários !');
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
