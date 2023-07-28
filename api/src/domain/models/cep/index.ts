export interface CepInterface {
  cep: string;
  logradouro: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  uf: string | null;
  enderecoPostal?: string;
}
