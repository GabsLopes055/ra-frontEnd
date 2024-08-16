import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { usuario, usuarioRequest } from '../interfaces/usuario.model';
import { loginRequest, loginResponse } from './../interfaces/login.model';

const URL = environment;


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http: HttpClient
  ) { }

  authentication(login: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${URL.base_url}/authentication/login`, login)
  }

  register(usuario: usuarioRequest): Observable<usuario> {
    return this.http.post<usuario>(`${URL.base_url}/authentication/register`, usuario)
  }

}
