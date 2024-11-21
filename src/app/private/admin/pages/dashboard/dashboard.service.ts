import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { graficos } from '../../../../interfaces/graficos.model';
const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private readonly http: HttpClient
  ) { }

  montarGraficoDeVendasPorMes(): Observable<graficos[]> {
    return this.http.get<graficos[]>(`${URL}/graficos/buscarQuantidadeVendas`);
  }

}
