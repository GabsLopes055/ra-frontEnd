import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';

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
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nomeCompleto: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),

  });

  constructor(){}

  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }

}
