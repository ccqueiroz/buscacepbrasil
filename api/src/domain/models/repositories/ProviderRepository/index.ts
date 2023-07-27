import { cepRegionsByFirstDigitCep } from '../../cepRegions/index';
import { CepInterface } from '../../cep';

export abstract class ProviderRepository {
  abstract getCep(
    region: (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep],
    cep: string,
  ): Promise<CepInterface | Error>;
}
