export interface Usuario {
  id: number;
  nome: string;
  rg: string;
  cpf: string;
  telefone: string;
  email: string;
  senha?: string; // Senha é opcional no retorno
  status: number;
  tipoPessoa: number[];
}

export interface Credenciais {
  username: string;
  password?: string;
}

export interface Token {
  token: string;
}

