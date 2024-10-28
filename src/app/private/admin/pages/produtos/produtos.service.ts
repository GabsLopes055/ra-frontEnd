import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filtroDeBuscaProduto, produtoRequest, produtos } from '../../../../interfaces/produtos.model';
import { EntityPaginated } from '../../../../interfaces/paginated.model';
import { valueBehavior } from '../../../../interfaces/valueBehavior.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  behaviorProduto = new BehaviorSubject<valueBehavior>({idEntidade: null, labelComponent: "app-produtos"});

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarProdutos(filtro: filtroDeBuscaProduto) : Observable<EntityPaginated<produtos[]>> {
    return this.http.post<EntityPaginated<produtos[]>>(`${URL}/produtos/listarTodosProdutos`, filtro)
  }

  public cadastrarProduto(produto: produtoRequest) : Observable<produtos> {
    return this.http.post<produtos>(`${URL}/produtos/salvarProduto`, produto)
  }

  public excluirProduto(idProduto: string | null) : Observable<void> {
    return this.http.delete<void>(`${URL}/produtos/deletarProduto/${idProduto}`);
  }

  public buscarProdutoPorId(idProduto: string | null) : Observable<produtos> {
    return this.http.get<produtos>(`${URL}/produtos/buscarProdutoPorId/${idProduto}`);
  }

  editarProduto(idProduto : string | null, produto : produtos) : Observable<produtos> {
    return this.http.put<produtos>(`${URL}/produtos/editarProduto/${idProduto}`, produto);
  }

}
