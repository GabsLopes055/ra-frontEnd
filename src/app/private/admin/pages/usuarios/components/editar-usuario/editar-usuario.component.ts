import { Component, Input, OnInit } from '@angular/core';
import {
  InputComponent,
  optionsInput,
} from '../../../../../../../shared/input/input.component';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../usuarios.service';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { usuario } from '../../../../../../interfaces/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss',
})
export class EditarUsuarioComponent implements OnInit {

  @Input() userId: string = '';

  optionsStatus: optionsInput[] = [
    { label: 'Selecione um status para o usuário', value: '' },
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
  ];

  optionsPermissao: optionsInput[] = [
    { label: 'Selecione uma permissão para o usuário', value: '' },
    { label: 'Usuario', value: 'USER' },
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Gerente', value: 'MANAGER' },
    { label: 'Suporte', value: 'SUPPORT' },
  ];

  formEditar = new FormGroup({
    userId: new FormControl('', Validators.required),
    nomeCompleto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    statusUsuario: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required),
  });

  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.usuarioService.buscarUsuarioPorId(this.userId).subscribe({
      next: (value) => {
        this.formEditar.controls.userId.setValue(value.userId);
        this.formEditar.controls.nomeCompleto.setValue(value.nomeCompleto);
        this.formEditar.controls.email.setValue(value.email);
        this.formEditar.controls.statusUsuario.setValue(value.statusUsuario);
        this.formEditar.controls.permissao.setValue(value.permissao);
      },
      error: (error) => {
        this.toastService.error(error.error.mensagem, error.error.error)
      },
    });
  }

  editar() {
    if(this.formEditar.valid) {
      this.usuarioService.editar(this.formEditar.value as usuario).subscribe({
        next: (value) => {
          this.toastService.success("Sucesso", "Usuário editado com Sucesso !");
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
