import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent, optionsInput } from '../../../../../../../shared/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';
import { UsuariosService } from '../../usuarios.service';
import { usuarioRequest } from '../../../../../../interfaces/usuario.model';
import { InputSelectComponent } from "../../../../../../../shared/input-select/input-select.component";

@Component({
  selector: 'app-cadastrar-usuarios',
  standalone: true,
  imports: [InputComponent, ButtonComponent, InputSelectComponent],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss',
})
export class CadastrarUsuarioComponent implements OnInit, OnDestroy {

  optionsStatus: optionsInput[] = [
    {label: 'Selecione um status para o usuário', value: ''},
    {label: 'Ativo', value: 'ATIVO'},
    {label: 'Inativo', value: 'INATIVO'}
  ]

  optionsPermissao: optionsInput[] = [
    {label: 'Selecione uma permissão para o usuário', value: ''},
    {label: 'Usuario', value: 'USER'},
    {label: 'Administrador', value: 'ADMIN'},
    {label: 'Gerente', value: 'MANAGER'},
    {label: 'Suporte', value: 'SUPPORT'}
  ]


  formCadastrar = new FormGroup({
    nomeCompleto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    statusUsuario: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly toastService: ToastService,
    private readonly usuarioService: UsuariosService
  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  cadastra() {
    if(this.formCadastrar.valid) {
      this.usuarioService.cadastrar(this.formCadastrar.value as usuarioRequest).subscribe({
        next: () => {
          this.toastService.success("Sucesso !", "Usuário cadastrado");
          this.formCadastrar.reset();
        }
      })
    } else {
      this.toastService.warning('Atenção', 'Preencha o formulário corretamente !')
    }
  }
}
