export interface usuario {
  userId: string;
  nomeCompleto: string;
  email: string;
  statusUsuario: string;
  permissao: string;
}

export interface usuarioRequest {
  nomeCompleto: string;
  email: string;
  password: string;
}
