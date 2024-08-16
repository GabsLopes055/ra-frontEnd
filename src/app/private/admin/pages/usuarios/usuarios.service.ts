import { usuario } from './../../../../interfaces/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private readonly http: HttpClient) { }

  public listarTodos() : Observable<usuario[]> {
    return this.http.get<usuario[]>(`${URL}/usuarios`)
  }
}
