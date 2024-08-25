import { produtos } from './produtos.model';

export interface categoria {
  idCategoria: string;
  nomeCategoria: string;
}

export interface categoriaComProdutos extends produtos {
  idCategoria: string;
  nomeCategoria: string;
  produtoResponses: produtos
}
