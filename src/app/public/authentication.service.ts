import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { usuario, usuarioRequest } from '../interfaces/usuario.model';
import { Observable } from 'rxjs';

const url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http: HttpClient
  ) { }

  register(usuario: usuarioRequest): Observable<usuario> {
    return this.http.post<usuario>(`${url} + authentication/register`, usuario)
  }

}
