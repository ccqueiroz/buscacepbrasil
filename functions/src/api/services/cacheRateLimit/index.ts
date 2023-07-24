import { ResponseRateLimitAdapter } from '../../models/responseAdapter/responseRateLimitAdapter';
import { RepositoryBaseCache } from '../../repositories/RepositoryBaseCache';

export class ServiceCacheRateLimit {
  private repositoryCache: RepositoryBaseCache;
  private keyIp: string | null = null;
  private _RATE_LIMIT = 3;
  private TTL = 10;
  constructor(repositoryCache: RepositoryBaseCache) {
    this.repositoryCache = repositoryCache;
  }

  private buidKeyIp(ip?: string) {
    if (!ip) this.keyIp = null;
    this.keyIp = `rate-limit-${ip?.replace(/::ffff:/g, '')}`;
  }

  async rateLimit(ip?: string): Promise<ResponseRateLimitAdapter> {
    this.buidKeyIp(ip);

    await this.repositoryCache.connectServer();

    if (!this.keyIp)
      return { code: 400, message: 'Ip do usuário não identificado.' };

    const requestCount =
      Number((await this.repositoryCache.getData(this.keyIp)) || 0) + 1;

    const setRateLimit = await this.repositoryCache.setData(
      this.keyIp,
      requestCount,
      this.TTL,
    );

    this.repositoryCache.disconnectServer();

    if (!setRateLimit.success) throw new Error('Deu ruim para salvar no redis');

    if (requestCount > this._RATE_LIMIT)
      return { code: 429, message: 'Taxa limite de requisições excedida.' };
    else return { code: 200, message: 'Taxa requisições dentro do limite.' };
  }
}
