export interface usuario {
  id: string;
  nome: string;
  email: string;
  status: string;
  tipo: string;
}

export interface usuarioRequest {
  nomeCompleto: string;
  email: string;
  password: string;
}