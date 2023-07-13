import { CepInterface } from '../../cep';
import { cepRegionsByFirstDigitCep } from '../../cepRegions';
import { ProviderRepository } from '../ProviderRepository';

export abstract class AbstractRepositoryBase extends ProviderRepository {
  private provider: ProviderRepository;
  constructor(provider: ProviderRepository) {
    super();
    this.provider = provider;
  }

  async getCep(
    region: (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep],
    cep: string,
  ): Promise<CepInterface | Error> {
    return await this.provider.getCep(region, cep);
  }
}
