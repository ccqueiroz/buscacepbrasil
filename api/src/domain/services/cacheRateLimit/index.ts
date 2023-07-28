import { ApiError } from '../../errors/ApiErrors';
import {
  ResponsePenalRateLimitAdapter,
  ResponseRateLimitAdapter,
} from '../../models/responseAdapter/responseRateLimitAdapter';
import { RepositoryBaseCache } from '../../repositories/RepositoryBaseCache';
import { normalizeIp } from '../../utils/normalizeIp';
import { ServiceCachePenalRateLimit } from '../cachePenalRateLimit';

export class ServiceCacheRateLimit {
  private repositoryCache: RepositoryBaseCache;
  private serviceCachePenalRateLimit: ServiceCachePenalRateLimit;
  private keyIp: string | null = null;
  private _RATE_LIMIT = 5;
  private TTL = 10; //10 segundos
  constructor(repositoryCache: RepositoryBaseCache) {
    this.repositoryCache = repositoryCache;
    this.serviceCachePenalRateLimit = new ServiceCachePenalRateLimit(
      repositoryCache,
    );
  }

  private buidKeyIp(ip?: string) {
    if (!ip) this.keyIp = null;
    else {
      const key = `rate-limit-${normalizeIp(ip)}`;
      if (key === 'rate-limit-undefined') this.keyIp = null;
      this.keyIp = key;
    }
  }

  async rateLimit(ip?: string): Promise<ResponseRateLimitAdapter> {
    this.buidKeyIp(ip);
    try {
      if (!this.repositoryCache.providerIsAlreadyConected()) {
        await this.repositoryCache.connectServer();
      }

      if (!this.keyIp)
        return { code: 422, message: 'Ip do usuário não identificado.' };

      const requestPenalRateLimit =
        await this.serviceCachePenalRateLimit.getPenalRateLimiting(this.keyIp);

      if (Object.prototype.hasOwnProperty.call(requestPenalRateLimit, 'code')) {
        return requestPenalRateLimit as ResponseRateLimitAdapter;
      }

      const requestCount =
        Number((await this.repositoryCache.getData(this.keyIp)) || 0) + 1;

      const setRateLimit = await this.repositoryCache.setData(
        this.keyIp,
        requestCount,
        this.TTL,
      );

      if (!setRateLimit.success)
        throw new ApiError('Falha ao estabelecer conexão com o banco.', 500);

      if (requestCount > this._RATE_LIMIT) {
        await this.serviceCachePenalRateLimit.setPenalRateLimiting(
          requestPenalRateLimit as ResponsePenalRateLimitAdapter,
        );
        return { code: 429, message: 'Taxa limite de requisições excedida.' };
      } else
        return { code: 200, message: 'Taxa requisições dentro do limite.' };
    } catch (error) {
      return { code: 500, message: (error as unknown as Error)?.message };
    } finally {
      if (this.repositoryCache.providerIsAlreadyConected()) {
        this.repositoryCache.disconnectServer();
      }
    }
  }
}
