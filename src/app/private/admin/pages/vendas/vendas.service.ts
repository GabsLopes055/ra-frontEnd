import { EntityPaginated, FiltroDeBusca } from './../../../../interfaces/paginated.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { filtroVenda, venda } from '../../../../interfaces/venda.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { valueBehavior } from '../../../../interfaces/valueBehavior.model';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  valueBehavior: valueBehavior = {
    idEntidade: null,
    labelComponent: null
  };

  abrirComponentVendaPorId = new BehaviorSubject<valueBehavior>(this.valueBehavior);

  constructor(private readonly http: HttpClient) { }

  public cadastrarVenda(venda: venda) : Observable<venda> {
    return this.http.post<venda>(`${URL}/vendas/cadastrarVenda`, venda);
  }

  public listarTodasAsVendas(filtro: filtroVenda): Observable<EntityPaginated<venda[]>> {
    return this.http.post<EntityPaginated<venda[]>>(`${URL}/vendas/listarVendas`, filtro);
  }

  public buscarVendaPorId(idVenda: string) : Observable<venda> {
    return this.http.get<venda>(`${URL}/vendas/buscarVendaPorId/${idVenda}`);
  }

}
