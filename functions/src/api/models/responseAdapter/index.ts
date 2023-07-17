import { CepInterface } from '../cep';

export interface ResponseAdapter {
  success: boolean;
  error?: string;
  data?: CepInterface;
}

export interface ResponseSetCacheAdapter {
  success: boolean;
}
