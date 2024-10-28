import { editarUsuario, FiltroUsuarioRequest, usuario, usuarioRequest } from './../../../../interfaces/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EntityPaginated } from '../../../../interfaces/paginated.model';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  editarUsuario = new BehaviorSubject<editarUsuario | null>(null);

  constructor(private readonly http: HttpClient) { }

  public listarTodos(filtroUsuarioRequest: FiltroUsuarioRequest) : Observable<EntityPaginated<usuario[]>> {
    return this.http.post<EntityPaginated<usuario[]>>(`${URL}/usuarios/listar-filtros`, filtroUsuarioRequest);
  }

  public cadastrar(usuarioRequest: usuarioRequest) : Observable<usuario> {
    return this.http.post<usuario>(`${URL}/usuarios/cadastrar`, usuarioRequest);
  }

  public desativarUsuario(idUsuario: string) : Observable<string> {
    return this.http.delete<string>(`${URL}/usuarios/deletarUsuario/${idUsuario}`);
  }

  public buscarUsuarioPorId(userId: string) : Observable<usuario> {
    return this.http.get<usuario>(`${URL}/usuarios/buscarPorId/${userId}`)
  }

  public editar(form: usuario): Observable<usuario> {
    return this.http.put<usuario>(`${URL}/usuarios/editarUsuario/${form.userId}`, form);
  }

}
