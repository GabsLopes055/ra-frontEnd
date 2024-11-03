import { FiltroDeBusca } from './paginated.model';
import { produtos } from './produtos.model';

export interface venda extends produtos {
  idVenda: string | null;
  produtosVendidos: produtos[] | null;
  totalVenda: number;
  dataVenda: string | null;
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

export interface filtroVenda extends FiltroDeBusca {
  dataInicio: any,
  dataFim: any
}
