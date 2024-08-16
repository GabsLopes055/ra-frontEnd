import { Injectable } from '@angular/core';

import { loginResponse } from './../../app/interfaces/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setToken(loginResponse: loginResponse) {
    sessionStorage.setItem('token', loginResponse.token)
    sessionStorage.setItem('usuario', loginResponse.usuario)
  }

  clearSession() {
    sessionStorage.clear();
  }
}
