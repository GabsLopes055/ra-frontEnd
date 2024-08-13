import { Component, OnDestroy, OnInit } from "@angular/core";
import { InputComponent } from "../../../shared/input/input.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../shared/button/button.component";
import { Router } from "@angular/router";
import { MenuService } from "../../../shared/menu/menu.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router,
    private readonly menuService: MenuService
  ){
    this.menuService._menu.next([]);
  }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['register']);
  }

  login() {
    this.menuService.criarMenu();
    this.router.navigate(['dashboard']);
  }

}
