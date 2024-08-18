import { FiltroUsuarioRequest, usuario } from './../../../../interfaces/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EntityPaginated } from '../../../../interfaces/paginated.model';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private readonly http: HttpClient) { }

  public listarTodos(filtroUsuarioRequest: FiltroUsuarioRequest) : Observable<EntityPaginated<usuario[]>> {
    return this.http.post<EntityPaginated<usuario[]>>(`${URL}/usuarios/listar-filtros`, filtroUsuarioRequest)
  }
}
