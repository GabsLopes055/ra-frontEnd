import { FiltroDeBusca } from './paginated.model';
import { produtos } from './produtos.model';

export interface venda extends produtos {
  idVenda: string | null;
  produtosVendidos: produtos[] | null;
  totalVenda: number | null;
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
  dataBusca: string | null
}
