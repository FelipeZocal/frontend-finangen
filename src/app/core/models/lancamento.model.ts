export interface Lancamento {
  idLancamento: number;
  descricao: string;
  dataLancamento: string;
  dataVencimento: string;
  dataBaixa: string;
  valorLancamento: number;
  tipoLancamento: number;
  situacao: number;
  id: number; // ID do usuário
  idCategoria: number;
  idConta: number;
}
