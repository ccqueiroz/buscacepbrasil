import { ApiError } from '../../errors/ApiErrors';
import { cepRegionsByFirstDigitCep } from '../../models/cepRegions';
import { AbstractRepositoryBase } from '../../models/repositories/AbstractRepositoryBase';
import { ResponseAdapter } from '../../models/responseAdapter/responseHTTPAdapter';
import { cepMask } from '../../utils/cepMask';
import { getRegionCep } from '../../utils/getRegionCep';
import { ServiceBuildFullAddress } from '../buildFullAddress';

export class ServiceGetCep {
  private repositoryBase: AbstractRepositoryBase;
  private cepRegion:
    | (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep]
    | undefined;

  constructor(repositoryBase: AbstractRepositoryBase) {
    this.repositoryBase = repositoryBase;
  }

  private getRegionCep(cep: string) {
    const cepRegion = getRegionCep(cep);
    this.cepRegion = cepRegion;
  }

  async getCep(cep?: string): Promise<ResponseAdapter> {
    this.getRegionCep(cep ?? '');
    try {
      if (!this.cepRegion) throw new ApiError('Cep inválido!', 422);

      cep = cep?.replace(/\D/g, '') ?? '';
      const response = await this.repositoryBase.getCep(this.cepRegion, cep);

      if (response instanceof Error) {
        throw new ApiError(response?.message, response?.statusCode ?? 400);
      }
      const enderecoPostal = new ServiceBuildFullAddress(response).execute();
      return {
        success: true,
        data: {
          ...response,
          cep: cepMask(response.cep),
          enderecoPostal,
        },
        code: 200,
      };
    } catch (error) {
      const err = error as unknown as ApiError;
      return { success: false, error: err.message, code: err?.statusCode };
    }
  }
}
