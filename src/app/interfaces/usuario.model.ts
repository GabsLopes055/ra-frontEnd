import { FiltroDeBusca } from "./paginated.model";

export interface usuario {
  userId: string;
  nomeCompleto: string;
  email: string;
  statusUsuario: StatusUser;
  permissao: Role;
}

export interface usuarioRequest {
  nomeCompleto: string;
  email: string;
  password: string;
}
export interface FiltroUsuarioRequest extends FiltroDeBusca {
  statusUser: StatusUser | null;
  nomeCompleto: string | null;
  email: string | null;
  role: Role | null;
  pagina: number | null;
  tamanhoPagina: number | null;
}

export enum StatusUser {
  ATIVO,
  INATIVO,
}

export enum Role {
  USER,
  MANAGER,
  ADMIN,
  SUPPORT,
}
