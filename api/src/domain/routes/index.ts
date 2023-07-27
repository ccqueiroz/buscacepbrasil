import { ControllerGetCep } from '../controllers/getCep';
import { AbstractRepositoryBase } from '../models/repositories/AbstractRepositoryBase';
import { enumRoutes } from './constants/enumRoutes';
import { Router } from '../../infra/models/routes';
import { RequestInfra, ResponseInfra } from '../../infra/models/http';

type Constructor = {
  routes: Router;
  baseRepository: AbstractRepositoryBase;
};

export class RoutesApp {
  private routes: Router;
  private baseRepository: AbstractRepositoryBase;

  constructor({ routes, baseRepository }: Constructor) {
    this.routes = routes;
    this.baseRepository = baseRepository;
  }

  private buildRoutes() {
    const controllerGetCep = new ControllerGetCep({
      baseRepository: this.baseRepository,
    });

    this.routes.get(
      enumRoutes.GET_CEP,
      async (request: RequestInfra, response: ResponseInfra) =>
        await controllerGetCep.execute(request, response),
    );
  }

  public init() {
    this.buildRoutes();
    return this.routes;
  }
}
