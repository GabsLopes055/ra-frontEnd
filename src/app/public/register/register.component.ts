import { AuthenticationService } from './../authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/input/input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ToastrService } from 'ngx-toastr';
import { usuarioRequest } from '../../interfaces/usuario.model';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/user/user.service';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {

  formLogin = new FormGroup({
    password: new FormControl('', Validators.required),
    nomeCompleto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  constructor(
    private readonly serviceAuthentication: AuthenticationService,
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly userService: UserService
  ){
    this.userService.clearSession();
  }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

  register() {
    if(this.formLogin.valid) {
      this.serviceAuthentication.register(this.formLogin.value as usuarioRequest).subscribe({
        next: () => {
          this.toast.success("Usuario cadastrado com sucesso !", "Peça a um administrador aprovar a sua entrada !");
          this.router.navigate(['']);
        }, error: (error) => {
          this.toast.error(error.error.mensagem, error.error.error);
        }
      })
    } else {
      this.toast.warning('Preencha o formulario corretamente!', 'Atenção !');
    }
  }

}
