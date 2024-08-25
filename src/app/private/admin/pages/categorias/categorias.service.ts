import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { categoria } from '../../../../interfaces/categoria.model';

const URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public listarCategorias() : Observable<categoria[]> {
    return this.http.get<categoria[]>(`${URL}/categoriasBolsas/listarTodasCategorias`);
  }
}
