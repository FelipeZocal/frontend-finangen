export interface Categoria {
  idCategoria: number;
  descricaoCategoria: string;
  id: number; // ID do usuário (pessoa)
  nome?: string; // Nome do usuário (opcional na listagem)
  cpf?: string; // CPF do usuário (opcional na listagem)
}
