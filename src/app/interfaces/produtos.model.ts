import { categoria } from './categoria.model';

export interface produtos extends categoria {
  idProduto: string,
  nomeProduto: string,
  precoVenda: number,
  precoCompra: number,
  quantidade: number,
  categoria: categoria
}

export interface filtroDeBuscaProduto {
  tipoProduto: string | null,
  pagina: number,
  tamanhoPagina: number
}
