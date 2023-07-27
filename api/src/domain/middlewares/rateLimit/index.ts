import { AbstractRepositoryBaseCache } from '../../models/repositories/AbstractRepositoryBaseCache';
import { ResponseAdapter } from '../../models/responseAdapter/responseHTTPAdapter';
import { ServiceCacheRateLimit } from '../../services/cacheRateLimit';
import {
  RequestInfra,
  ResponseInfra,
  NextFunctionInfra,
} from '../../../infra/models/http';

export class MiddlewareRateLimit {
  private serviceCacheRateLimit: ServiceCacheRateLimit;

  constructor(baseCacheRepository: AbstractRepositoryBaseCache) {
    this.serviceCacheRateLimit = new ServiceCacheRateLimit(baseCacheRepository);
  }

  public async execute(
    request: RequestInfra,
    response: ResponseInfra,
    next: NextFunctionInfra,
  ) {
    const { ipControll } = request;

    const responseRateLimit = await this.serviceCacheRateLimit.rateLimit(
      ipControll,
    );

    if (responseRateLimit.code !== 200) {
      return response.status(responseRateLimit.code).send({
        error: responseRateLimit.message,
        success: false,
      } as ResponseAdapter);
    }

    return next();
  }
}
