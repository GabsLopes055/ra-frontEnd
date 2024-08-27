import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filtroDeBuscaProduto, produtos } from '../../../../interfaces/produtos.model';
import { EntityPaginated } from '../../../../interfaces/paginated.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarProdutos(filtro: filtroDeBuscaProduto) : Observable<EntityPaginated<produtos[]>> {
    return this.http.post<EntityPaginated<produtos[]>>(`${URL}/produtos/listarTodosProdutos`, filtro)
  }

}
