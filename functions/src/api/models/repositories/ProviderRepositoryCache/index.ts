import { ResponseSetCacheAdapter } from '../../responseAdapter';

export abstract class ProviderRepositoryCache {
  abstract getData<T>(key: string): Promise<T | null>;
  abstract setData<T>(
    key: string,
    data: T,
    ttl: number,
  ): Promise<ResponseSetCacheAdapter>;
}
