import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { categoria, categoriaComProdutos, categoriaRequest } from '../../../../interfaces/categoria.model';
import { EntityPaginated, FiltroDeBusca } from '../../../../interfaces/paginated.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  listarProdutosDaCategoria = new BehaviorSubject<any>(null);

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarCategorias(filtro: FiltroDeBusca) : Observable<EntityPaginated<categoria[]>> {
    return this.http.post<EntityPaginated<categoria[]>>(`${URL}/categoriasBolsas/listarTodasCategorias`, filtro);
  }

  public cadastrarCategoria(categoria: categoriaRequest): Observable<categoria> {
    return this.http.post<categoria>(`${URL}/categoriasBolsas/cadastrarCategoria`, categoria);
  }

  public listarProdutosPorCategoria(idCategoria: string) : Observable<categoriaComProdutos> {
    return this.http.get<categoriaComProdutos>(`${URL}/categoriasBolsas/listarProdutosPorCategoria/${idCategoria}`);
  }

  public buscarCategoriaPorId(idCategoria: string) : Observable<categoria> {
    return this.http.get<categoria>(`${URL}/categoriasBolsas/buscarCategoriaPorId/${idCategoria}`);
  }

  public excluirCategoria(idCategoria: string) : Observable<void> {
    return this.http.delete<void>(`${URL}/categoriasBolsas/deletarCategoria/${idCategoria}`);
  }

  public editarCategoria(idCategoria: string, categoria: categoria) : Observable<categoria> {
    return this.http.put<categoria>(`${URL}/categoriasBolsas/editarCategoria/${idCategoria}`, categoria);
  }

}
