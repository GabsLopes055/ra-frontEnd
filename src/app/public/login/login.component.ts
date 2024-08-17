import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/button/button.component';
import { InputComponent } from '../../../shared/input/input.component';
import { MenuService } from '../../../shared/menu/menu.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { loginRequest } from '../../interfaces/login.model';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService,
    private readonly authentiticationService: AuthenticationService,
    private readonly toast: ToastService,
    private readonly userService: UserService
  ) {
    this.userService.clearSession();
    this.menuService._menu.next([]);
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  register() {
    this.router.navigate(['register']);
  }

  login() {
    if (this.formLogin.valid) {
      this.authentiticationService
        .authentication(this.formLogin.value as loginRequest)
        .subscribe({
          next: (loginResponse) => {
            this.userService.setToken(loginResponse);
            this.menuService.criarMenu();
            this.router.navigate(['dashboard']);
          },
          error: (error) => {
            if (error.error.status == '401') {
              this.toast.info(error.error.mensagem, error.error.error);
            } else if (error.error.status == '400') {
              this.toast.warning(error.error.mensagem, "Sua senha está incorreta");
            } else {
              this.toast.error('', 'Usuário não encontrado');
            }
          },
        });
    } else {
      this.toast.warning(
        'Formulário incorreto',
        'Preencha o formulário corretamente !'
      );
    }
  }
}
