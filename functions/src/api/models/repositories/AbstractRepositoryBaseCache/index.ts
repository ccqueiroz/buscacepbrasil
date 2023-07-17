import { ResponseSetCacheAdapter } from '../../responseAdapter';
import { ProviderRepositoryCache } from '../ProviderRepositoryCache';

export abstract class AbstractRepositoryBaseCache {
  private provider: ProviderRepositoryCache;
  constructor(provider: ProviderRepositoryCache) {
    this.provider = provider;
  }

  async getData<T>(key: string): Promise<T | null> {
    return await this.provider.getData<T>(key);
  }
  async setData<T>(
    key: string,
    data: T,
    ttl: number,
  ): Promise<ResponseSetCacheAdapter> {
    return await this.provider.setData<T>(key, data, ttl);
  }
}
