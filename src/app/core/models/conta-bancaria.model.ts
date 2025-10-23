export interface ContaBancaria {
  idConta: number;
  descricaoConta: string;
  agenciaConta: string;
  numeroConta: string;
  limiteConta: string;
  saldoConta: number;
  tipoConta: number;
  id: number; // ID do usuário
  nome?: string;
  idBanco: number;
  razaoSocial?: string;
}
