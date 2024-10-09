import { categoria } from './categoria.model';

export interface produtos {
  idProduto: string | null;
  nomeProduto: string | null;
  precoVenda: number | null;
  precoCompra: number | null;
  quantidade: number | null;
  categoria: categoria;
}

export interface produtoRequest extends categoria {
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
