import {
  ResponsePenalRateLimitAdapter,
  ResponseRateLimitAdapter,
} from '../../models/responseAdapter/responseRateLimitAdapter';
import { RepositoryBaseCache } from '../../repositories/RepositoryBaseCache';

export class ServiceCachePenalRateLimit {
  private repositoryCache: RepositoryBaseCache;
  private keyIp: string | null = null;
  private _RATE_LIMIT = 3;
  private TTL = 60 * 60; //3600 segundos => 1h
  constructor(repositoryCache: RepositoryBaseCache) {
    this.repositoryCache = repositoryCache;
  }
  private buidKeyIp(ip: string) {
    if (!ip) this.keyIp = null;
    this.keyIp = `penal-rate-limit-${ip?.replace(/::ffff:/g, '')}`;
  }

  async getPenalRateLimiting(
    ip: string,
  ): Promise<ResponsePenalRateLimitAdapter | ResponseRateLimitAdapter> {
    this.buidKeyIp(ip);
    if (!this.repositoryCache.providerIsAlreadyConected())
      return {
        code: 400,
        message: 'Falha ao estabelecer conexão com o banco.',
      };
    if (!this.keyIp)
      return { code: 400, message: 'Ip do usuário não identificado.' };

    const requestPenalRateLimiting: number | null =
      await this.repositoryCache.getData(this.keyIp);

    if (!requestPenalRateLimiting)
      return {
        key: this.keyIp,
        count: 0,
      };

    if (requestPenalRateLimiting > this._RATE_LIMIT)
      return { code: 429, message: 'Penalidade por excesso de requisições.' };

    return {
      key: this.keyIp,
      count: requestPenalRateLimiting,
    };
  }

  async setPenalRateLimiting(
    requestPenalRateLimit: ResponsePenalRateLimitAdapter,
  ): Promise<void> {
    try {
      await this.repositoryCache.setData(
        requestPenalRateLimit.key,
        requestPenalRateLimit.count + 1,
        this.TTL,
      );
    } catch (error) {
      this.repositoryCache.disconnectServer();
      throw new Error('Falha ao estabelecer conexão com o banco.');
    }
  }
}
