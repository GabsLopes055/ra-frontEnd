import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { produtos } from '../../../../interfaces/produtos.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarProdutos() : Observable<produtos[]> {
    return this.http.get<produtos[]>(`${URL}/produtos/listarTodosProdutos`)
  }

}
