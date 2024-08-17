import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../../../../../../../shared/input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../../../../shared/button/button.component';
import { ToastService } from '../../../../../../../shared/toast/toast.service';

@Component({
  selector: 'app-cadastrar-usuarios',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.scss',
})
export class CadastrarUsuarioComponent implements OnInit, OnDestroy {

  formCadastrar = new FormGroup({
    nomeCompleto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    statusUsuario: new FormControl('', Validators.required),
    permissao: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  cadastra() {
    if(this.formCadastrar.valid) {

    } else {
      this.toastService.warning('Atenção', 'Preencha o formulário corretamente !')
    }
  }
}
