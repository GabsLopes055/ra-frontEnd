import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { categoria } from '../../../../interfaces/categoria.model';
import { EntityPaginated, FiltroDeBusca } from '../../../../interfaces/paginated.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  listarProdutosDaCategoria = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarCategorias(filtro: FiltroDeBusca) : Observable<EntityPaginated<categoria[]>> {
    return this.http.post<EntityPaginated<categoria[]>>(`${URL}/categoriasBolsas/listarTodasCategorias`, filtro);
  }
}
