import { ServiceGetCep } from '../../services/getCep';
import { AbstractRepositoryBase } from '../../models/repositories/AbstractRepositoryBase';
import { RequestInfra, ResponseInfra } from '../../../infra/models/http';

type Constructor = {
  baseRepository: AbstractRepositoryBase;
};
export class ControllerGetCep {
  private serviceGetCep: ServiceGetCep;

  constructor({ baseRepository }: Constructor) {
    this.serviceGetCep = new ServiceGetCep(baseRepository);
  }

  public async execute(request: RequestInfra, response: ResponseInfra) {
    const { params } = request;
    const { cep } = params;

    const responseCep = await this.serviceGetCep.getCep(cep);

    return response.send(responseCep);
  }
}
