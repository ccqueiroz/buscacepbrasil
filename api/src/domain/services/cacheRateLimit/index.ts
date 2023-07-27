import {
  ResponsePenalRateLimitAdapter,
  ResponseRateLimitAdapter,
} from '../../models/responseAdapter/responseRateLimitAdapter';
import { RepositoryBaseCache } from '../../repositories/RepositoryBaseCache';
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
    const key = `rate-limit-${ip?.replace(/::ffff:/g, '')}`;
    if (key === 'rate-limit-undefined') this.keyIp = null;
    this.keyIp = key;
  }

  async rateLimit(ip?: string): Promise<ResponseRateLimitAdapter> {
    this.buidKeyIp(ip);
    try {
      if (!this.repositoryCache.providerIsAlreadyConected()) {
        await this.repositoryCache.connectServer();
      }

      if (!this.keyIp)
        return { code: 400, message: 'Ip do usuário não identificado.' };

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
        throw new Error('Falha ao estabelecer conexão com o banco.');

      if (requestCount > this._RATE_LIMIT) {
        await this.serviceCachePenalRateLimit.setPenalRateLimiting(
          requestPenalRateLimit as ResponsePenalRateLimitAdapter,
        );
        return { code: 429, message: 'Taxa limite de requisições excedida.' };
      } else
        return { code: 200, message: 'Taxa requisições dentro do limite.' };
    } finally {
      this.repositoryCache.disconnectServer();
    }
  }
}
