import { cepRegionsByFirstDigitCep } from '../../models/cepRegions';
import { ResponseAdapter } from '../../models/responseAdapter';
import { RepositoryBase } from '../../repositories/RepositoryBase';
import { cepMask } from '../../utils/cepMask';
import { getRegionCep } from '../../utils/getRegionCep';

export class ServiceGetCep {
  private cep: string;
  private repositoryBase: RepositoryBase;
  private cepRegion:
    | (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep]
    | undefined;

  constructor(repositoryBase: RepositoryBase, cep?: string) {
    this.cep = cep ?? '';
    this.repositoryBase = repositoryBase;
  }

  private getRegionCep() {
    const cepRegion = getRegionCep(this.cep);
    this.cepRegion = cepRegion;
  }

  async getCep(): Promise<ResponseAdapter> {
    this.getRegionCep();
    try {
      if (!this.cepRegion) throw new Error('Cep inválido!');

      const cep = this.cep.replace(/\D/g, '');
      const response = await this.repositoryBase.getCep(this.cepRegion, cep);

      if (response instanceof Error) {
        throw new Error(response?.message);
      }

      return {
        success: true,
        data: {
          ...response,
          cep: cepMask(response.cep),
        },
      };
    } catch (error) {
      const err = error as unknown as Error;
      return { success: false, error: err.message };
    }
  }
}
