import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { venda } from '../../../../interfaces/venda.model';
import { Observable } from 'rxjs';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private readonly http: HttpClient) { }

  public cadastrarVenda(venda: venda) : Observable<venda> {
    return this.http.post<venda>(`${URL}/vendas/cadastrarVenda`, venda);
  }

}
