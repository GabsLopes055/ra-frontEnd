import { produtos } from './produtos.model';

export interface venda extends produtos {
  produtosVendidos: produtos[] | null;
  totalVenda: number | null;
  metodoPagamento: string | null;
  status: string | null;
  desconto: number | null;
}

export enum metodoPagamento {
  CREDITO,
  DEBITO,
  DINHEIRO,
  PIX,
}

export enum status {
  CONCLUIDA,
  CANCELADA,
  PENDENTE,
}
