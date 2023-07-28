import { CepInterface } from '../../cep';

export interface ResponseAdapter {
  success: boolean;
  error?: string;
  data?: CepInterface;
  code?: number;
}
